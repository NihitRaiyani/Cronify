/**
 * One-shot hero asset prep: the supplied source AVIF/SVG set → the responsive
 * files the hero ships.
 *   node scripts/prep-hero-assets.mjs
 *
 * Panorama (opaque)              → hero-dusk-panorama-{2048,1024}.avif
 * Peak cutout (alpha, UNTRIMMED) → hero-peak-cutout-{2048,1024}.avif
 * Journey line                   → hero-journey-line.svg (verbatim copy)
 *
 * The cutout is deliberately NOT trimmed to its alpha bounding box. It shares
 * the journey line's source canvas (cutout 3840x2160 downscaled to 2048x1152,
 * line 3840x2100 — same width, 60px trimmed off the bottom), so rendering both
 * at width:100% inside one box registers the line onto the ridge with no
 * offsets at all. Trimming destroys that relationship and puts us back to
 * hand-tuned magic numbers.
 *
 * Uses sips (macOS built-in) rather than sharp: sharp is only present here
 * transitively via next, so importing it directly is a dependency we don't own.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, statSync } from "node:fs";

const SRC_PANORAMA = "public/UG7DO77CykOXq0OIDltEMrQUh4.avif";
const SRC_CUTOUT = "public/lBbSywiWIms0ThszzT2DJpKvUM.avif";
const SRC_LINE = "public/knFgtQU9L40WUn6kC2QqKqcjBoA.svg";

/** Sources are 2048 wide; 1024 is the mobile/tablet step. */
const WIDTHS = [2048, 1024];

const kb = (n) => `${Math.round(n / 1024)}KB`;

function probe(file) {
  const out = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file], {
    encoding: "utf8",
  });
  const get = (k) => Number(out.match(new RegExp(`${k}: (\\d+)`))?.[1]);
  return { width: get("pixelWidth"), height: get("pixelHeight") };
}

function emit(src, width, out) {
  if (width >= probe(src).width) {
    copyFileSync(src, out); // already at or below target — never upscale
  } else {
    execFileSync("sips", [
      "-s", "format", "avif",
      "--resampleWidth", String(width),
      src, "--out", out,
    ]);
  }
  const { width: w, height: h } = probe(out);
  console.log(`${out}  ${w}x${h}  ${kb(statSync(out).size)}`);
}

for (const w of WIDTHS) emit(SRC_PANORAMA, w, `public/hero-dusk-panorama-${w}.avif`);
for (const w of WIDTHS) emit(SRC_CUTOUT, w, `public/hero-peak-cutout-${w}.avif`);

copyFileSync(SRC_LINE, "public/hero-journey-line.svg");
console.log(`public/hero-journey-line.svg  ${kb(statSync("public/hero-journey-line.svg").size)}`);
