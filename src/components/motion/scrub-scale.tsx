"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

/**
 * Measured Agentify media treatment: the panel's content scales 1.3→1,
 * scrubbed as the element top travels ~85%→10% of the viewport with a
 * decelerating mapping (sampled 1.26 → 1.11 → 1.03 → 1.00), bidirectional.
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 10%"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 0.08, 0.31, 0.56, 1],
    [1.3, 1.26, 1.11, 1.03, 1],
  );
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <m.div data-reveal style={{ scale }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}
