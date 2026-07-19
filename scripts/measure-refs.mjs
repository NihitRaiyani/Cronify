#!/usr/bin/env node
/**
 * measure-refs.mjs — measure external reference sites for the redesign.
 *
 * Usage:
 *   node scripts/measure-refs.mjs [--site solidroad|agentify]
 *
 * Outputs (all under refs/, gitignored):
 *   refs/<site>-<width>.png                  full-page screenshots (1440, 390)
 *   refs/crops/<site>-<NN>-<slug>-1440.png   per-section crops of the 1440 shot
 *   refs/measurements.json                   raw structured data per site/section
 *
 * Webflow gotcha: IX2 leaves untriggered elements at opacity:0/translated —
 * a settle-scroll pass runs before any style is read. Marquee transforms are
 * mid-animation at read time; record gap + animation-duration, never transform.
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const only = args.includes("--site") ? args[args.indexOf("--site") + 1] : null;

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const SITES = [
  { id: "solidroad", url: "https://solidroad.com/" },
  { id: "agentify", url: "https://agentify-template.webflow.io/" },
].filter((s) => !only || s.id === only);

fs.mkdirSync("refs/crops", { recursive: true });

const HIDE_CSS = `
  .w-webflow-badge, [class*="cookie" i], [id*="cookie" i],
  [class*="consent" i] { display: none !important; }
`;

async function settle(page) {
  await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {});
  await page.evaluate(async () => {
    await document.fonts.ready;
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 70));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1_500);
}

/** Runs in the page. Returns JSON-serializable measurements. */
function collectInPage() {
  const style = (el) => getComputedStyle(el);

  const typo = (el) => {
    const s = style(el);
    return {
      text: (el.textContent || "").trim().slice(0, 80),
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      textTransform: s.textTransform,
      color: s.color,
    };
  };

  const box = (el) => {
    const s = style(el);
    return {
      tag: el.tagName.toLowerCase(),
      cls: String(el.className || "").slice(0, 120),
      backgroundColor: s.backgroundColor,
      backgroundImage: s.backgroundImage.slice(0, 400),
      border: s.border,
      borderRadius: s.borderRadius,
      boxShadow: s.boxShadow.slice(0, 300),
      padding: s.padding,
      gap: s.gap,
      display: s.display,
      maxWidth: s.maxWidth,
      width: Math.round(el.getBoundingClientRect().width),
    };
  };

  // ---- section discovery: big, viewport-wide blocks in document order ----
  const vw = document.documentElement.clientWidth;
  const candidates = [
    ...document.querySelectorAll("section, header, footer, main > div, body > div div"),
  ]
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.height > 160 && r.width > vw * 0.85);

  // de-nest: drop an element when a kept ancestor has nearly the same rect
  const kept = [];
  for (const c of candidates) {
    const dup = kept.find(
      (k) =>
        k.el.contains(c.el) &&
        Math.abs(k.r.top - c.r.top) < 40 &&
        Math.abs(k.r.height - c.r.height) < 80
    );
    if (!dup) kept.push(c);
  }
  kept.sort((a, b) => a.r.top - b.r.top);

  const sections = kept.map(({ el, r }, i) => {
    const s = style(el);
    const heading = el.querySelector("h1,h2,h3");
    const paras = [...el.querySelectorAll("p")]
      .sort((a, b) => b.textContent.length - a.textContent.length)
      .slice(0, 2);
    const small = el.querySelector(
      "small, [class*='caption' i], [class*='eyebrow' i], [class*='label' i], [class*='tag' i]"
    );
    const buttons = [...el.querySelectorAll("a,button")]
      .filter((b) => {
        const bs = style(b);
        return (
          bs.backgroundColor !== "rgba(0, 0, 0, 0)" ||
          bs.borderStyle !== "none" ||
          /button|btn|cta/i.test(String(b.className))
        );
      })
      .slice(0, 2);
    const cards = [...el.querySelectorAll(":scope div")]
      .filter((d) => {
        const ds = style(d);
        const dr = d.getBoundingClientRect();
        return (
          dr.width > 200 &&
          dr.height > 120 &&
          parseFloat(ds.borderRadius) >= 8 &&
          (ds.backgroundColor !== "rgba(0, 0, 0, 0)" ||
            ds.borderStyle !== "none" ||
            ds.boxShadow !== "none")
        );
      })
      .slice(0, 3);
    // container: descendant with an explicit max-width or centered margins
    let container = null;
    for (const d of el.querySelectorAll(":scope > div, :scope > div > div")) {
      const ds = style(d);
      if (
        ds.maxWidth !== "none" ||
        (ds.marginLeft === ds.marginRight && parseFloat(ds.marginLeft) > 0)
      ) {
        container = {
          maxWidth: ds.maxWidth,
          width: Math.round(d.getBoundingClientRect().width),
          paddingLeft: ds.paddingLeft,
          paddingRight: ds.paddingRight,
        };
        break;
      }
    }

    return {
      index: i,
      rect: { top: Math.round(r.top + window.scrollY), height: Math.round(r.height) },
      tag: el.tagName.toLowerCase(),
      cls: String(el.className || "").slice(0, 140),
      headingText: heading ? heading.textContent.trim().slice(0, 70) : "",
      paddingTop: s.paddingTop,
      paddingBottom: s.paddingBottom,
      backgroundColor: s.backgroundColor,
      backgroundImage: s.backgroundImage.slice(0, 400),
      container,
      headings: [...el.querySelectorAll("h1,h2,h3,h4")].slice(0, 4).map(typo),
      paragraphs: paras.map(typo),
      caption: small ? typo(small) : null,
      buttons: buttons.map((b) => ({ ...typo(b), ...box(b) })),
      cards: cards.map(box),
    };
  });

  const fonts = [
    ...new Set([...document.fonts].map((f) => `${f.family} ${f.weight} ${f.style}`)),
  ];
  const bodyS = style(document.body);

  const anims = document
    .getAnimations({ subtree: true })
    .slice(0, 60)
    .map((a) => {
      const t = a.effect?.target;
      const timing = a.effect?.getTiming?.() || {};
      let keyframes = null;
      try {
        keyframes = a.effect?.getKeyframes?.().map((k) => {
          const { offset, easing, composite, computedOffset, ...props } = k;
          void easing;
          void composite;
          return { offset: computedOffset ?? offset, props: Object.keys(props).slice(0, 5) };
        });
      } catch {
        /* cross-origin keyframes — skip */
      }
      return {
        type: a.constructor.name,
        name: a.animationName || a.transitionProperty || "",
        target: t ? `${t.tagName?.toLowerCase()}.${String(t.className).slice(0, 60)}` : "",
        duration: timing.duration,
        delay: timing.delay,
        easing: timing.easing,
        iterations: timing.iterations,
        keyframes,
      };
    });

  return {
    viewport: { width: vw, height: document.documentElement.clientHeight },
    pageHeight: document.body.scrollHeight,
    body: {
      backgroundColor: bodyS.backgroundColor,
      color: bodyS.color,
      fontFamily: bodyS.fontFamily,
      fontSize: bodyS.fontSize,
      lineHeight: bodyS.lineHeight,
    },
    rootFontSize: style(document.documentElement).fontSize,
    fonts,
    sections,
    animations: anims,
  };
}

/** Crop a region out of an already-saved full-page PNG, via a local HTML page.
 *  The HTML must be a real file next to the image — file:// subresources are
 *  blocked from about:blank (setContent) pages. */
async function cropFromFullpage(browser, fullpagePng, top, height, outFile) {
  const h = Math.min(Math.round(height), 4000);
  const htmlFile = path.resolve("refs", ".crop.html");
  const rel = path.relative(path.dirname(htmlFile), path.resolve(fullpagePng));
  fs.writeFileSync(
    htmlFile,
    `<body style="margin:0"><img src="${rel}" style="display:block;width:1440px;margin-top:-${Math.round(top)}px"></body>`
  );
  const page = await browser.newPage({
    viewport: { width: 1440, height: Math.max(200, h) },
    deviceScaleFactor: 1,
  });
  await page.goto("file://" + htmlFile);
  await page.waitForTimeout(150);
  await page.screenshot({ path: outFile });
  await page.close();
}

const out = {};
const browser = await chromium.launch({
  args: ["--disable-blink-features=AutomationControlled"],
});

// --crops-only: regenerate refs/crops/ from existing full-page PNGs + JSON
if (args.includes("--crops-only")) {
  const prev = JSON.parse(fs.readFileSync("refs/measurements.json", "utf8"));
  try {
    for (const site of SITES) {
      const data = prev[site.id]?.[1440];
      if (!data) continue;
      for (const s of data.sections) {
        const slug =
          (s.headingText || s.tag)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 28) || `sec${s.index}`;
        const nn = String(s.index).padStart(2, "0");
        const crop = `refs/crops/${site.id}-${nn}-${slug}-1440.png`;
        await cropFromFullpage(browser, `refs/${site.id}-1440.png`, s.rect.top, s.rect.height, crop);
      }
      console.log(`${site.id}: ${data.sections.length} crops regenerated`);
    }
  } finally {
    await browser.close();
  }
  process.exit(0);
}

try {
  for (const site of SITES) {
    out[site.id] = {};
    const fontFiles = new Set();

    // ---- main pass at 1440: measure + full-page shot ----
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      userAgent: UA,
    });
    page.on("response", (r) => {
      if (/\.(woff2?|otf|ttf)(\?|$)/i.test(r.url()))
        fontFiles.add(r.url().split("/").pop().split("?")[0]);
    });
    console.log(`→ ${site.id} @1440 …`);
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.addStyleTag({ content: HIDE_CSS });
    await settle(page);

    const data = await page.evaluate(collectInPage);
    data.fontFiles = [...fontFiles];
    out[site.id][1440] = data;

    const fullpage = `refs/${site.id}-1440.png`;
    await page.screenshot({ path: fullpage, fullPage: true });
    console.log(`  ${fullpage}  (${data.sections.length} sections found)`);

    // ---- entrance sampling pass (fresh page, no pre-scroll) ----
    console.log(`  sampling entrance animations …`);
    const p2 = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      userAgent: UA,
    });
    await p2.goto(site.url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await p2.waitForTimeout(800);
    const entrances = [];
    for (const s of data.sections) {
      const series = await p2
        .evaluate(
          async ({ top }) => {
            window.scrollTo(0, Math.max(0, top - 450));
            await new Promise((r) => setTimeout(r, 30));
            const el = document.elementFromPoint(720, 500);
            const target = el?.closest("[data-w-id]") || el;
            if (!target) return null;
            const samples = [];
            for (let t = 0; t <= 1400; t += 100) {
              const cs = getComputedStyle(target);
              samples.push({ t, opacity: cs.opacity, transform: cs.transform.slice(0, 60) });
              await new Promise((r) => setTimeout(r, 100));
            }
            return {
              target: `${target.tagName.toLowerCase()}.${String(target.className).slice(0, 50)}`,
              samples,
            };
          },
          { top: s.rect.top }
        )
        .catch(() => null);
      entrances.push({ index: s.index, heading: s.headingText, series });
    }
    out[site.id][1440].entrances = entrances;
    await p2.close();
    await page.close();

    // ---- per-section crops from the full-page shot ----
    for (const s of data.sections) {
      const slug =
        (s.headingText || s.tag)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 28) || `sec${s.index}`;
      const nn = String(s.index).padStart(2, "0");
      const crop = `refs/crops/${site.id}-${nn}-${slug}-1440.png`;
      await cropFromFullpage(browser, fullpage, s.rect.top, s.rect.height, crop);
      s.crop = crop.replace("refs/", "");
    }
    console.log(`  ${data.sections.length} crops → refs/crops/`);

    // ---- 390 pass: screenshot only ----
    const m = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
      userAgent: UA,
    });
    console.log(`→ ${site.id} @390 …`);
    await m.goto(site.url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await m.addStyleTag({ content: HIDE_CSS });
    await settle(m);
    await m.screenshot({ path: `refs/${site.id}-390.png`, fullPage: true });
    console.log(`  refs/${site.id}-390.png`);
    await m.close();
  }

  fs.writeFileSync("refs/measurements.json", JSON.stringify(out, null, 2));
  console.log("wrote refs/measurements.json");
} finally {
  await browser.close();
}
