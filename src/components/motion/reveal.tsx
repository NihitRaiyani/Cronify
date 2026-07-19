"use client";

import * as m from "motion/react-m";

/** Measured Agentify blur-rise easing (power2.out-like). */
const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** rise distance — measured 14% of element height; pass 0 for fade-only */
  y?: number | string;
  scale?: number;
  /** blur radius in px at rest state — measured 5; pass 0 for fade-only */
  blur?: number;
  /** viewport margin for the whileInView trigger — measured fire at ~86% vh */
  margin?: string;
  duration?: number;
  ease?: readonly [number, number, number, number];
};

/**
 * Scroll-entrance wrapper — the measured Agentify "blur-rise": opacity 0→1,
 * translateY 14%→0, scale 0.95→1, blur 5→0 over ~600ms ease-out, one-shot,
 * firing when the element top hits ~86% of the viewport. Always renders the
 * motion div (branching the DOM shape on useReducedMotion is
 * hydration-race-unstable); reduced-motion and no-JS visitors are covered by
 * CSS: a prefers-reduced-motion rule and a <noscript> rule in the root layout
 * both force [data-reveal] visible and unfiltered.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = "14%",
  scale = 0.95,
  blur = 5,
  margin = "0px 0px -14% 0px",
  duration = 0.6,
  ease = EASE_OUT,
}: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y, scale, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin }}
      transition={{ duration, delay, ease: [...ease] }}
    >
      {children}
    </m.div>
  );
}
