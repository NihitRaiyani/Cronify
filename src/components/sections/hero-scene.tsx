"use client";

import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

/**
 * The hero's photographic layer stack, split out of hero.tsx so that file stays
 * about layout and entrance timing.
 *
 * Two exports because the layers sit on opposite sides of the text/console in
 * the z-stack: HeroBackdrop paints behind everything, HeroRidge paints over the
 * console card's lower third.
 *
 * Plain <img> throughout: these are pre-sized AVIFs, so next/image would add a
 * request hop and a layout wrapper for nothing.
 */

/** Composition-corrected overscan (measured): our panorama carries less sky
 *  than the reference photo, so a plain 100% fill crushed the sky band to ~15%.
 *  120% height with a -6% top bias restores the ~35% sky-to-mountain balance. */
const PANORAMA_BOX = { top: "-6%", height: "120%" } as const;

export function HeroBackdrop() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  // Slow drift as the hero scrolls away — transform-only, so it composites on
  // the GPU. Clamped by default, and flattened to 0 for reduced motion (a
  // MotionValue bypasses MotionConfig's reducedMotion handling).
  //
  // The preference gates the output RANGE rather than the style object itself:
  // useReducedMotion is false during SSR and true on a reduced-motion client,
  // so branching the style prop changes the rendered attribute between server
  // and client and trips a hydration mismatch. Both render y=0 at scrollY=0.
  const y = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 72]);

  return (
    <>
      {/* Dusk panorama — static from first paint (measured: no entrance).
          The section's overflow-hidden clips the overscan. */}
      <m.img
        src="/hero-dusk-panorama-2048.avif"
        srcSet="/hero-dusk-panorama-1024.avif 1024w, /hero-dusk-panorama-2048.avif 2048w"
        sizes="100vw"
        alt=""
        width={2048}
        height={1152}
        fetchPriority="high"
        decoding="async"
        draggable={false}
        className="absolute left-0 w-full object-cover"
        style={{ ...PANORAMA_BOX, y }}
      />
      {/* measured left scrim: 270deg transparent to black, opacity 0.5, left half */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/2 opacity-50"
        style={{ background: "linear-gradient(270deg, rgba(0,0,0,0) 0%, #000 100%)" }}
      />
    </>
  );
}

/**
 * Sunlit foreground peak + the hand-drawn lime journey line that traces it.
 *
 * Both assets come off the same 3840-wide source canvas — the cutout is
 * 3840x2160, the line 3840x2100 (identical width, 60px trimmed off the bottom).
 * So giving both w-full inside this one box registers the line onto the ridge
 * from their intrinsic aspect ratios alone: no offsets, no viewBox surgery,
 * nothing to re-tune when the viewport changes.
 *
 * The cutout is untrimmed, so its alpha bbox sits at left 37.7% / top 59.0%
 * with the ridge touching the bottom-right corner — hence bottom-0 right-0, and
 * a box width 1.605x the visible ridge width. The summit sits at (75.31%,
 * 58.89%) of the box; 97vw puts it at (1094, 576) on a 1440x900 hero, against
 * the reference's (1075, 578). Shrinking the box shrinks the line with it, so
 * the two never need re-registering.
 *
 * From lg up the box is sized off the hero's HEIGHT rather than the viewport
 * width, because that is what the summit's position actually depends on:
 * summitY = H - 0.2305W, and the reference puts the summit at 0.64H, so
 * W = 1.562H. The clamp mirrors the hero's own min-h/max-h, which keeps the
 * summit at 64% on every desktop height instead of drifting from 64% on a wide
 * screen to 77% on a short narrow one.
 */
export function HeroRidge({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-0 right-0 w-[min(160vw,1530px)] md:w-[min(130vw,1530px)] lg:w-[calc(1.562_*_clamp(720px,100svh,980px))]",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-peak-cutout-2048.avif"
        srcSet="/hero-peak-cutout-1024.avif 1024w, /hero-peak-cutout-2048.avif 2048w"
        sizes="(min-width: 1024px) 97vw, 160vw"
        alt=""
        width={2048}
        height={1152}
        decoding="async"
        draggable={false}
        className="w-full"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-journey-line.svg"
        alt=""
        width={3840}
        height={2100}
        decoding="async"
        draggable={false}
        className="absolute inset-x-0 top-0 w-full"
      />
    </div>
  );
}
