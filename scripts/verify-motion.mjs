/**
 * Motion + hero-image verification (additive to verify-landing.mjs).
 *   node scripts/verify-motion.mjs [baseUrl]
 *
 * Asserts at 1440 (desktop-only ruling):
 *  1. hero panorama + peak cutout decoded; panorama covers the section;
 *     cutout hugs the bottom-right corner (±2px)
 *  2. every <img> has an alt attribute and a local (same-origin) src
 *  3. entrance triggers: pricing cards (viewport margin -21%) and final-cta
 *     para (-14%) are hidden just before their trigger and visible after
 *  4. after a full scroll-through, every [data-reveal] is visible
 *  5. prefers-reduced-motion: everything visible with no transform/filter,
 *     without any scrolling
 *
 * Security note: page.evaluate/$$eval below run fixed inline functions in a
 * headless page against our own localhost app — no dynamic code strings, no
 * untrusted input (this is Playwright's API, not JS eval()).
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://localhost:3011";
const VW = 1440;
const VH = 900;
const failures = [];
const ok = (name) => console.log(`  ok  ${name}`);
const bad = (name, detail) => {
  failures.push(name);
  console.log(`  FAIL ${name} — ${detail}`);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH } });
await page.goto(BASE, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2200); // hero choreography settles ≤ ~2s

// 1 — hero images
const hero = await page.evaluate(() => {
  const section = document.querySelector("#hero");
  const s = section.getBoundingClientRect();
  return [...section.querySelectorAll("img")].map((img) => {
    const r = img.getBoundingClientRect();
    return {
      src: img.getAttribute("src"),
      nw: img.naturalWidth,
      rect: { top: r.top, bottom: r.bottom, left: r.left, right: r.right, w: r.width, h: r.height },
      section: { top: s.top, bottom: s.bottom, w: s.width, h: s.height },
    };
  });
});
const pano = hero.find((i) => i.src.includes("hero-dusk-panorama"));
const peak = hero.find((i) => i.src.includes("hero-peak-cutout"));
if (!pano || pano.nw === 0) bad("hero panorama decoded", JSON.stringify(pano));
else if (pano.rect.w < pano.section.w - 2 || pano.rect.h < pano.section.h - 2)
  bad("hero panorama covers section", JSON.stringify(pano.rect));
else ok("hero panorama decoded + covers section");
if (!peak || peak.nw === 0) bad("hero cutout decoded", JSON.stringify(peak));
else if (Math.abs(peak.rect.right - VW) > 2 || Math.abs(peak.rect.bottom - peak.section.bottom) > 2)
  bad("hero cutout hugs bottom-right", JSON.stringify(peak.rect));
else ok("hero cutout decoded + anchored bottom-right");

// 2 — alt + local src on every <img> (decode check runs after scroll-through,
// once lazy images have entered the viewport)
const imgs = await page.$$eval("img", (els) =>
  els.map((e) => ({
    alt: e.getAttribute("alt"),
    src: e.getAttribute("src") || "",
  })),
);
const altMissing = imgs.filter((i) => i.alt === null);
const remote = imgs.filter((i) => /^https?:\/\//.test(i.src));
if (altMissing.length) bad("img alt attributes", `${altMissing.length} missing`);
else ok(`img alt attributes (${imgs.length} imgs)`);
if (remote.length) bad("img srcs local", remote.map((i) => i.src).join(", "));
else ok("img srcs local");

// 3 — entrance trigger spot-checks
async function spotCheck(name, targetSel, marginPct) {
  // anchor on the first Reveal div itself (not the section container — reveals
  // can sit hundreds of px inside it); word-reveal spans are excluded.
  const revealSel = `${targetSel} div[data-reveal]`;
  const top = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? el.getBoundingClientRect().top + scrollY : null;
  }, revealSel);
  if (top === null) return bad(`${name} trigger`, `selector ${revealSel} not found`);
  const triggerLine = VH * (1 - marginPct); // reveal top must rise above this
  // just-before: reveal top sits 6% below its trigger line
  await page.evaluate((y) => window.scrollTo(0, y), top - triggerLine - VH * 0.06);
  await page.waitForTimeout(400);
  const before = await page.$$eval(revealSel, (els) =>
    els.map((e) => Number(getComputedStyle(e).opacity)),
  );
  // past: reveal top 10% above the trigger line
  await page.evaluate((y) => window.scrollTo(0, y), top - triggerLine + VH * 0.1);
  await page.waitForTimeout(1100);
  const after = await page.$$eval(revealSel, (els) =>
    els.map((e) => Number(getComputedStyle(e).opacity)),
  );
  const hiddenBefore = before.some((o) => o < 0.15);
  const visibleAfter = after.some((o) => o > 0.9);
  if (hiddenBefore && visibleAfter) ok(`${name} fires at its margin`);
  else bad(`${name} trigger`, `before=[${before.map((o) => o.toFixed(2))}] after=[${after.map((o) => o.toFixed(2))}]`);
}
await spotCheck("pricing cards", "#pricing div.mt-12", 0.21);
await spotCheck("final-cta para", "#final-cta", 0.14);

// 4 — full scroll-through, then everything revealed
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
const total = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y <= total; y += 500) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(180);
}
await page.waitForTimeout(900);
// only rendered wrappers count — display:none breakpoints never fire IO
const stuck = await page.$$eval("[data-reveal]", (els) =>
  els
    .filter((e) => e.getClientRects().length > 0)
    .filter((e) => Number(getComputedStyle(e).opacity) < 0.9)
    .map((e) => `${e.tagName}.${String(e.className).slice(0, 40)}`),
);
if (stuck.length) bad("all reveals visible after scroll-through", stuck.slice(0, 5).join(" | "));
else ok("all [data-reveal] visible after scroll-through");
// lazy imgs have now been through the viewport — decode check
const undecoded = await page.$$eval("img", (els) =>
  els.filter((e) => e.naturalWidth === 0).map((e) => e.getAttribute("src")),
);
if (undecoded.length) bad("imgs decoded", undecoded.join(", "));
else ok("imgs decoded (after scroll-through)");

// 5 — reduced motion: static and fully visible without scrolling
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(BASE, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(600);
const rm = await page.$$eval("[data-reveal]", (els) =>
  els.map((e) => {
    const cs = getComputedStyle(e);
    return { o: Number(cs.opacity), t: cs.transform, f: cs.filter };
  }),
);
const rmBad = rm.filter(
  (r) => r.o < 1 || (r.t !== "none" && r.t !== "matrix(1, 0, 0, 1, 0, 0)") || (r.f !== "none" && r.f !== ""),
);
if (rmBad.length) bad("reduced-motion static+visible", `${rmBad.length}/${rm.length} wrappers off`);
else ok(`reduced-motion static+visible (${rm.length} wrappers)`);

await browser.close();
console.log(failures.length ? `\nverify-motion: FAIL (${failures.length})` : "\nverify-motion: PASS");
process.exit(failures.length ? 1 : 0);
