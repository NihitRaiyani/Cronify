"use client";

import { useRef } from "react";
import { cubicBezier } from "motion";
import { useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";

const POWER2_IN_OUT = cubicBezier(0.455, 0.03, 0.515, 0.955);
/** Measured GSAP timeline shape: per-word tween 1.4 units, stagger amount 0.7
 *  spread across the words. */
const TWEEN = 1.4;
const AMOUNT = 0.7;

function Word({
  progress,
  index,
  count,
  text,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  text: string;
}) {
  const total = AMOUNT + TWEEN;
  const lag = count > 1 ? AMOUNT / (count - 1) : 0;
  const start = (index * lag) / total;
  const end = start + TWEEN / total;
  const opacity = useTransform(progress, [start, end], [0, 1], {
    ease: POWER2_IN_OUT,
  });
  const y = useTransform(progress, [start, end], ["25%", "0%"], {
    ease: POWER2_IN_OUT,
  });
  return (
    <span className="inline-block overflow-clip align-bottom">
      <m.span data-reveal className="inline-block" style={{ opacity, y }}>
        {text}
      </m.span>
    </span>
  );
}

/**
 * Measured Agentify heading treatment: the heading is pre-split into per-word
 * clip masks; each word fades and rises 25%→0 inside its mask, scrubbed by
 * scroll (not time) as the heading top travels 95%→70% of the viewport,
 * ~0.8s smoothing, power2.inOut, replaying in reverse on scroll-up.
 * Reduced-motion/no-JS: every word span carries [data-reveal], so the CSS
 * safety nets force them visible and untransformed.
 */
export function WordReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 70%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <Word
            progress={progress}
            index={i}
            count={words.length}
            text={word}
          />
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
