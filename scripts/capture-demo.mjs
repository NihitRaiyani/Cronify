/**
 * Capture real screenshots of the deployed Lumora demo for the showcase slot.
 *   node scripts/capture-demo.mjs
 *
 * Pinned viewport + DPR so captures are reproducible. Headless page pixels
 * only — no browser chrome, no URL text baked into the image.
 * Writes public/demo/showcase-overview.webp (wide) and -portrait.webp (tall);
 * the section uses whichever fits the card slot.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const URL = "https://lumora-demo.pages.dev/";
const kb = (n) => `${Math.round(n / 1024)}KB`;

await mkdir("public/demo", { recursive: true });
const browser = await chromium.launch();

async function capture({ width, height, out, displayWidth }) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
  // settle: let entrance animations and lazy content finish
  await page.waitForTimeout(1800);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
  const png = await page.screenshot({ type: "png" });
  await page.close();
  const info = await sharp(png)
    .resize({ width: displayWidth })
    .webp({ quality: 80, effort: 6 })
    .toFile(out);
  console.log(`${out}  ${info.width}x${info.height}  ${kb(info.size)}`);
}

await capture({
  width: 1440,
  height: 900,
  displayWidth: 1400,
  out: "public/demo/showcase-overview.webp",
});

await browser.close();
