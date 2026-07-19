#!/usr/bin/env node
/**
 * diff-section.mjs — side-by-side of one of our sections vs its reference crop.
 *
 * Usage:
 *   node scripts/diff-section.mjs <sectionKey> <passN> [url]
 *
 * Reads refs/section-map.json (hand-authored after measurement):
 *   { "hero": { "id": "#hero", "ref": "crops/solidroad-01-....png" },
 *     "navbar": { "clip": { "height": 88 }, "ref": "crops/..." }, ... }
 *
 * Writes refs/diffs/<key>-pass<N>.png  (REF | OURS montage, each column 720px)
 * and    refs/diffs/<key>-pass<N>-ours.png (raw section shot).
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const [key, passN = "1", url = "http://localhost:3011"] = process.argv.slice(2);
if (!key) {
  console.error("usage: node scripts/diff-section.mjs <sectionKey> <passN> [url]");
  process.exit(2);
}

const map = JSON.parse(fs.readFileSync("refs/section-map.json", "utf8"));
const entry = map[key];
if (!entry) {
  console.error(`no "${key}" in refs/section-map.json — keys: ${Object.keys(map).join(", ")}`);
  process.exit(2);
}
const refPng = path.resolve("refs", entry.ref);
if (!fs.existsSync(refPng)) {
  console.error(`missing reference crop: ${refPng}`);
  process.exit(2);
}

fs.mkdirSync("refs/diffs", { recursive: true });
const oursPng = path.resolve(`refs/diffs/${key}-pass${passN}-ours.png`);
const outPng = `refs/diffs/${key}-pass${passN}.png`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
  await page.evaluate(async () => {
    await document.fonts.ready;
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1_000);

  if (entry.clip) {
    // fixed elements (navbar): viewport clip at scrollY 0
    await page.screenshot({
      path: oursPng,
      clip: { x: 0, y: 0, width: 1440, height: entry.clip.height ?? 90 },
    });
  } else {
    const loc = page.locator(entry.id);
    await loc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900); // let the entrance animation finish
    await loc.screenshot({ path: oursPng, animations: "disabled" });
  }

  // montage: relative img srcs, html lives next to the images (per-key name so
  // concurrent diff runs don't clobber each other)
  const montage = path.resolve(`refs/diffs/.montage-${key}.html`);
  const rel = (p) => path.relative(path.dirname(montage), p);
  fs.writeFileSync(
    montage,
    `<!doctype html><body style="margin:0;background:#1a1a1a;font:12px monospace;color:#bbb">
<div style="display:flex;gap:8px;padding:8px;align-items:flex-start">
  <div><div style="padding:4px 2px">REF — ${key} (pass ${passN})</div>
    <img src="${rel(refPng)}" style="display:block;width:720px"></div>
  <div><div style="padding:4px 2px">OURS</div>
    <img src="${rel(oursPng)}" style="display:block;width:720px"></div>
</div></body>`
  );
  const mp = await browser.newPage({ viewport: { width: 1480, height: 900 }, deviceScaleFactor: 1 });
  await mp.goto("file://" + montage);
  await mp.waitForTimeout(200);
  await mp.screenshot({ path: outPng, fullPage: true });
  await mp.close();
  console.log(outPng);
} finally {
  await browser.close();
}
