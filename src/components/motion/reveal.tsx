"use client";

import * as m from "motion/react-m";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/**
 * Scroll-entrance wrapper. Always renders the motion div (branching the DOM
 * shape on useReducedMotion is hydration-race-unstable); reduced-motion and
 * no-JS visitors are covered by CSS: a prefers-reduced-motion rule and a
 * <noscript> rule in the root layout both force [data-reveal] visible.
 */
export function Reveal({ children, className, delay = 0, y = 26 }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
