"use client";

import * as m from "motion/react-m";

const EASE = [0.22, 1, 0.36, 1] as const;

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  /** false = play on mount (above-the-fold); true = play when scrolled into view */
  inView?: boolean;
  /** viewport margin for the whileInView trigger (measured per section) */
  margin?: string;
};

/**
 * Staggered entrance group. Like Reveal, it always renders motion divs — the
 * reduced-motion/no-JS safety net is the CSS rule on [data-reveal].
 */
export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.08,
  inView = true,
  margin = "-80px",
}: StaggerProps) {
  const viewProps = inView
    ? { whileInView: "show" as const, viewport: { once: true, margin } }
    : { animate: "show" as const };
  return (
    <m.div
      data-reveal
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
      {...viewProps}
    >
      {children}
    </m.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  x?: number;
  duration?: number;
  ease?: readonly [number, number, number, number];
};

export function StaggerItem({
  children,
  className,
  y = 24,
  x = 0,
  duration = 0.7,
  ease = EASE,
}: StaggerItemProps) {
  return (
    <m.div
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, y, x },
        show: { opacity: 1, y: 0, x: 0, transition: { duration, ease: [...ease] } },
      }}
    >
      {children}
    </m.div>
  );
}
