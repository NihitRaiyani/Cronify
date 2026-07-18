"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  /** false = play on mount (above-the-fold); true = play when scrolled into view */
  inView?: boolean;
};

export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.08,
  inView = true,
}: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  const viewProps = inView
    ? { whileInView: "show" as const, viewport: { once: true, margin: "-80px" } }
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
};

export function StaggerItem({ children, className, y = 24, x = 0 }: StaggerItemProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      data-reveal
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y, x },
        show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </m.div>
  );
}
