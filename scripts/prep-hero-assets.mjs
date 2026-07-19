/**
 * One-shot hero asset prep: 3840×2160 source PNGs → responsive webp.
 *   node scripts/prep-hero-assets.mjs
 *
 * Panorama (opaque)  → hero-dusk-panorama-{2880,1920,1024}.webp
 * Peak cutout (alpha) → trimmed to its bounding box, then hero-peak-cutout-{2200,1280}.webp
 * Prints the cutout trim box — the hero <img> needs those numbers for width/height.
 */
import sharp from "sharp";

const SRC_PANORAMA = "public/UG7DO77CykOXq0OIDltEMrQUh4.png";
const SRC_CUTOUT = "public/lBbSywiWIms0ThszzT2DJpKvUM.png";

const kb = (n) => `${Math.round(n / 1024)}KB`;

for (const [w, quality] of [
  [2880, 72],
  [1920, 75],
  [1024, 75],
]) {
  const out = `public/hero-dusk-panorama-${w}.webp`;
  const info = await sharp(SRC_PANORAMA)
    .resize({ width: w })
    .webp({ quality, effort: 6 })
    .toFile(out);
  console.log(`${out}  ${info.width}x${info.height}  ${kb(info.size)}`);
}

const { data: trimmedPng, info: t } = await sharp(SRC_CUTOUT)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer({ resolveWithObject: true });
console.log(
  `cutout trim box: left=${-t.trimOffsetLeft} top=${-t.trimOffsetTop} ` +
    `width=${t.width} height=${t.height} (source 3840x2160, aspect ${(t.width / t.height).toFixed(4)})`
);

for (const w of [2200, 1280]) {
  const out = `public/hero-peak-cutout-${w}.webp`;
  const info = await sharp(trimmedPng)
    .resize({ width: Math.min(w, t.width) })
    .webp({ quality: 75, alphaQuality: 90, effort: 6 })
    .toFile(out);
  console.log(`${out}  ${info.width}x${info.height}  ${kb(info.size)}`);
}
