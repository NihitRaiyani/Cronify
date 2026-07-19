#!/usr/bin/env node
/**
 * shots.mjs — viewport screenshots of the landing page for visual review.
 *
 * Usage:
 *   node scripts/shots.mjs [url]          → verify-out/shot-{1440,768,390}.png (full page)
 *   node scripts/shots.mjs [url] --rm     → adds shot-390-rm.png with reduced motion emulated
 *   node scripts/shots.mjs [url] --og     → public/og.png (1200×630 viewport capture)
 *
 * Also reports documentElement.scrollWidth vs clientWidth per viewport so
 * horizontal overflow is caught at every width, not just 390.
 */
import fs from "node:fs";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith("--")) ?? "http://localhost:3011";
const og = args.includes("--og");
const rm = args.includes("--rm");

const VIEWPORTS = [
  [1440, 900],
  [768, 1024],
  [390, 844],
];

fs.mkdirSync("verify-out", { recursive: true });
const browser = await chromium.launch();

async function settle(page) {
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
  await page.waitForTimeout(1_200);
}

try {
  if (og) {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 2,
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await settle(page);
    await page.screenshot({ path: "public/og.png" });
    console.log("wrote public/og.png (1200×630 @2x)");
  } else {
    for (const [w, h] of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
      await settle(page);
      const m = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      const file = `verify-out/shot-${w}.png`;
      await page.screenshot({ path: file, fullPage: true });
      const flag = m.scrollWidth > m.clientWidth + 1 ? "  ⚠ H-OVERFLOW" : "";
      console.log(`${file}  scrollWidth=${m.scrollWidth} clientWidth=${m.clientWidth}${flag}`);
      await page.close();
    }
    if (rm) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
      await settle(page);
      await page.screenshot({ path: "verify-out/shot-1440-rm.png", fullPage: true });
      console.log("verify-out/shot-1440-rm.png (reduced motion)");
    }
  }
} finally {
  await browser.close();
}
