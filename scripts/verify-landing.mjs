#!/usr/bin/env node
/**
 * verify-landing.mjs — self-contained port of the Lumora verify-on-target contract,
 * run against this landing page. The JSON verdict is the only ground truth.
 *
 * Usage: node scripts/verify-landing.mjs <url> [label] [expectText] [outDir]
 *
 * Loads <url> in headless Chromium at desktop 1440×900 (per project direction:
 * desktop web is the target) and asserts:
 *   demoLoaded    main document 2xx AND expectText present in *visible* text
 *   noLocalhost   zero requests/baked URLs to any localhost origin except the target's own
 *   imgsLoaded    every visible http(s) <img> decoded (naturalWidth > 0)
 *   noImgErrors   zero 4xx/5xx image/media responses
 *   noHOverflow   documentElement.scrollWidth <= clientWidth + 1
 *   noFabrication visible text contains no "$", no fake-brand string, no banned claim
 * Writes <outDir>/<label>.json + <outDir>/<label>.png (width-clipped, full height).
 * Exit: 0 PASS · 1 FAIL/ERROR · 2 usage.
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const VIEWPORT = { width: 1440, height: 900 };

// Kept in sync with backend/app/services/generation.py _BANNED_CLAIMS (25 terms).
const BANNED_CLAIMS = [
  "premier", "best", "leading", "top", "#1", "finest", "award-winning",
  "award winning", "trusted", "premium", "exclusive", "renowned", "authentic",
  "luxury", "expert", "specialist", "certified", "official", "authorized",
  "established", "quality", "superior", "unmatched", "world-class", "world class",
];
const FAKE_BRANDS = [
  "AuraPrecision", "CyberPulse", "VÉLOURS PARIS", "VELOURS PARIS", "L'Étoile",
  "L'Etoile", "AURA SILK PARISIENNE", "AURA SILK", "concierge@auraprecision.med",
];
const LOCALHOST_RX = /localhost|127\.0\.0\.1|0\.0\.0\.0/i;

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const claimRegexes = BANNED_CLAIMS.map((t) => ({
  term: t,
  rx: new RegExp(`(?<!\\w)${esc(t)}(?!\\w)`, "i"),
}));

const url = process.argv[2];
if (!url) {
  console.error("Usage: node scripts/verify-landing.mjs <url> [label] [expectText] [outDir]");
  process.exit(2);
}
const label = (process.argv[3] ?? "target").replace(/[^a-z0-9-]+/gi, "-").toLowerCase();
const expectText = process.argv[4] ?? "";
const outDir = process.argv[5] ?? "verify-out";
fs.mkdirSync(outDir, { recursive: true });

const targetOrigin = new URL(url).origin;
const verdict = {
  url,
  label,
  viewport: VIEWPORT,
  startedAt: new Date().toISOString(),
  assertions: {},
  verdict: "ERROR",
  error: null,
  finishedAt: null,
};

const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const foreignLocalhostHits = [];
  const imgErrors = [];
  page.on("request", (req) => {
    try {
      const u = new URL(req.url());
      if (LOCALHOST_RX.test(u.hostname) && u.origin !== targetOrigin) {
        foreignLocalhostHits.push(req.url());
      }
    } catch {
      /* data:/blob: URLs — ignore */
    }
  });
  page.on("response", (res) => {
    const type = res.request().resourceType();
    if ((type === "image" || type === "media") && res.status() >= 400) {
      imgErrors.push({ url: res.url(), status: res.status() });
    }
  });

  const mainRes = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
  const mainStatus = mainRes ? mainRes.status() : 0;

  // Force lazy images eager, then walk the page so lazy/in-view content loads.
  await page.evaluate(() => {
    for (const img of document.querySelectorAll("img[loading=lazy]")) {
      img.loading = "eager";
    }
  });
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {});
  await page.waitForTimeout(2_500);
  await page
    .waitForFunction(
      () =>
        [...document.querySelectorAll("img")]
          .filter((i) => /^https?:/.test(i.currentSrc || i.src) && i.offsetParent !== null)
          .every((i) => i.complete && i.naturalWidth > 0),
      { timeout: 30_000 },
    )
    .catch(() => {});

  // Visible text only: TreeWalker + offsetParent filter (CSS-hidden text excluded).
  const visibleText = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const parts = [];
    let node;
    while ((node = walker.nextNode())) {
      const el = node.parentElement;
      if (!el) continue;
      if (el.closest("script,style,noscript,template")) continue;
      if (el.offsetParent === null && getComputedStyle(el).position !== "fixed") continue;
      const text = node.textContent;
      if (text && text.trim()) parts.push(text.trim());
    }
    return parts.join(" ");
  });

  const bakedLocalhost = await page.evaluate(
    ([rxSrc, origin]) => {
      const html = document.documentElement.outerHTML;
      const rx = new RegExp(`https?://[^"'\\s)]*(?:${rxSrc})[^"'\\s)]*`, "gi");
      const hits = html.match(rx) ?? [];
      return [...new Set(hits.filter((h) => !h.startsWith(origin)))].slice(0, 8);
    },
    ["localhost|127\\.0\\.0\\.1|0\\.0\\.0\\.0", targetOrigin],
  );

  const imgState = await page.evaluate(() => {
    const all = [...document.querySelectorAll("img")].filter((i) =>
      /^https?:/.test(i.currentSrc || i.src),
    );
    const visible = all.filter((i) => i.offsetParent !== null);
    return {
      totalImgs: document.querySelectorAll("img").length,
      withHttpSrc: all.length,
      broken: visible
        .filter((i) => !(i.complete && i.naturalWidth > 0))
        .map((i) => ({ src: (i.currentSrc || i.src).slice(0, 200), naturalWidth: i.naturalWidth })),
      hiddenBrokenCount: all.filter(
        (i) => i.offsetParent === null && !(i.complete && i.naturalWidth > 0),
      ).length,
    };
  });

  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    const offenders = [];
    if (doc.scrollWidth > doc.clientWidth + 1) {
      for (const el of document.querySelectorAll("*")) {
        if (offenders.length >= 8) break;
        const r = el.getBoundingClientRect();
        if (r.right > doc.clientWidth + 1 && getComputedStyle(el).position !== "fixed") {
          offenders.push({
            tag: el.tagName,
            cls: String(el.className).slice(0, 80),
            right: Math.round(r.right),
          });
        }
      }
    }
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, offenders };
  });

  const dollarSigns = visibleText.includes("$")
    ? [...visibleText.matchAll(/[^\s]*\$[^\s]*/g)].slice(0, 5).map((m) => m[0])
    : [];
  const fakeBrands = FAKE_BRANDS.filter((b) =>
    visibleText.toLowerCase().includes(b.toLowerCase()),
  );
  const superlatives = claimRegexes
    .filter(({ rx }) => rx.test(visibleText))
    .map(({ term }) => term);

  verdict.assertions = {
    demoLoaded: {
      pass:
        mainStatus >= 200 &&
        mainStatus < 400 &&
        (expectText === "" || visibleText.includes(expectText)),
      status: mainStatus,
      expectText,
    },
    noLocalhost: {
      pass: foreignLocalhostHits.length === 0 && bakedLocalhost.length === 0,
      networkHits: [...new Set(foreignLocalhostHits)].slice(0, 8),
      htmlHits: bakedLocalhost,
    },
    imgsLoaded: {
      pass: imgState.broken.length === 0,
      ...imgState,
    },
    noImgErrors: { pass: imgErrors.length === 0, errors: imgErrors.slice(0, 8) },
    noHOverflow: { pass: overflow.scrollWidth <= overflow.clientWidth + 1, ...overflow },
    noFabrication: {
      pass: dollarSigns.length === 0 && fakeBrands.length === 0 && superlatives.length === 0,
      dollarSigns,
      fakeBrands,
      superlatives,
    },
  };

  const shotHeight = Math.min(
    await page.evaluate(() => document.body.scrollHeight),
    8_000,
  );
  const shotPath = path.join(outDir, `${label}.png`);
  await page.screenshot({
    path: shotPath,
    fullPage: true,
    clip: { x: 0, y: 0, width: VIEWPORT.width, height: shotHeight },
  });
  verdict.assertions.screenshot = { pass: true, path: shotPath };

  verdict.verdict = Object.values(verdict.assertions).every((a) => a.pass)
    ? "PASS"
    : "FAIL";
} catch (err) {
  verdict.error = String(err && err.message ? err.message : err);
  verdict.verdict = "ERROR";
} finally {
  verdict.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(outDir, `${label}.json`), JSON.stringify(verdict, null, 2));
  await browser.close();
}

console.log(JSON.stringify(verdict, null, 2));
process.exit(verdict.verdict === "PASS" ? 0 : 1);
