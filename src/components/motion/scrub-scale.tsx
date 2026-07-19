"use client";

import { useRef } from "react";
import { useScroll, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

/**
 * Measured Agentify media treatment (`.image-scale-on-scroll`): the panel's
 * content scales 1.3→1 tied LINEARLY to the element's top travelling from
 * ~82% to ~17% of the viewport, then run through a ~0.35s exponential
 * smoothing lag (sampled settle tail 1.023→1.014→1.007→1 after the map ends).
 * One-way (measured): scrolling back up never reverses the settled scale.
 * [data-reveal] keeps the reduced-motion CSS net in force (transform: none).
 */
export function ScrubScale({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const peak = useRef(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "start 0.17"],
  });
  // one-way ratchet — the reference persists its settled state on scroll-up
  const oneWay = useTransform(() => {
    peak.current = Math.max(peak.current, scrollYProgress.get());
    return peak.current;
  });
  const smoothed = useSpring(oneWay, {
    stiffness: 90,
    damping: 22,
    mass: 1,
    skipInitialAnimation: true,
  });
  const scale = useTransform(smoothed, [0, 1], [1.3, 1]);
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <m.div data-reveal style={{ scale }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}
