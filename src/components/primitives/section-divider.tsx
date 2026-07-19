"use client";

import * as m from "motion/react-m";

/** Measured Agentify blur-rise easing (power2.out-like). */
const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

/** Measured Agentify divider crosshair: 24x24 render of a 23-unit box — four
 *  1px #ADEE84 ticks with a 7px center gap + a 1.4r center dot. */
function CornerCross() {
  return (
    <svg width="24" height="24" viewBox="0 0 23 23" fill="none">
      <line x1="0" y1="11.5" x2="8" y2="11.5" stroke="var(--accent-tile)" />
      <line x1="15" y1="11.5" x2="23" y2="11.5" stroke="var(--accent-tile)" />
      <line
        x1="11.5"
        y1="0.5"
        x2="11.5"
        y2="7.5"
        stroke="var(--accent-tile)"
        strokeLinecap="square"
      />
      <line x1="11.5" y1="15" x2="11.5" y2="23" stroke="var(--accent-tile)" />
      <circle cx="11.5" cy="11.5" r="1.4" fill="var(--accent-tile)" />
    </svg>
  );
}

/**
 * Measured Agentify section seam: full-bleed 1px hairline at the boundary +
 * a 24px crosshair centered on each page-line intersection (container edges,
 * x=80/1360 @1440). Zero-height, so it never shifts section spacing; the
 * crosses fade in once (0→1, ~650ms ease-out, both together, ~87% vh) and
 * only render where the page lines exist (≥1360px).
 */
export function SectionDivider() {
  return (
    <div aria-hidden className="pointer-events-none relative z-10 h-0">
      <div className="absolute inset-x-0 top-0 h-px bg-edge" />
      <m.div
        data-reveal
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -13% 0px" }}
        transition={{ duration: 0.65, ease: [...EASE_OUT] }}
        className="absolute -top-3 left-1/2 hidden h-6 w-[1280px] -translate-x-1/2 min-[1360px]:block"
      >
        <span className="absolute -left-3 top-0">
          <CornerCross />
        </span>
        <span className="absolute -right-3 top-0">
          <CornerCross />
        </span>
      </m.div>
    </div>
  );
}
