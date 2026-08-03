"use client";

import { m } from "framer-motion";
import {
  Dumbbell,
  Scissors,
  Shirt,
  Smartphone,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Marquee } from "@/components/primitives/marquee";
import { BUILT_FOR, type VerticalKey } from "@/content/built-for";
import { Container } from "../primitives/container";

const ICONS: Record<VerticalKey, LucideIcon> = {
  restaurant: UtensilsCrossed,
  clinic: Stethoscope,
  gym: Dumbbell,
  clothing: Shirt,
  salon: Scissors,
  electronics: Smartphone,
};

const SETS_PER_HALF = 2;

// Smooth spring/easing configuration for the reveal animations
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

export function BuiltFor() {
  return (
    <section id="built-for" className="relative overflow-x-clip pt-12">
      {/* 1. Animate the dusk gradient fade-in on scroll */}
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
      />

      {/* 
        Parent m.div handles the staggered entrance of children. 
        When it comes into view, it triggers the "visible" state on all child variants.
      */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2, // Staggers the text and the marquee by 0.2s
            },
          },
        }}
      >
        {/* 2. Text Reveal */}
        <m.div variants={fadeUpVariants as any} className="relative px-6 text-center">
          <p className="font-display text-2xl font-medium leading-tight text-ink">
            {BUILT_FOR.kicker}
            <span className="ml-3 font-gujarati text-lg font-normal text-lime/90">
              {BUILT_FOR.kickerGujarati}
            </span>
          </p>
        </m.div>

        {/* 3. Marquee Reveal Container */}
        <Container className="max-w-[1342px]">
          <m.div variants={fadeUpVariants as any} className="relative mt-10">
            <Marquee
              className="border-y border-edge [mask-image:none]"
              trackClassName="gap-0 pr-0"
              setsPerHalf={SETS_PER_HALF}
              pauseOnHover
            >
              {BUILT_FOR.verticals.map((v) => {
                const Icon = ICONS[v.key];
                return (
                  /* 4. Interactive Hover Animations inside the Marquee */
                  <m.span
                    key={v.key}
                    whileHover={{
                      scale: 1.08,
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      transition: { type: "spring", stiffness: 400, damping: 20 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-[100px] w-[253px] shrink-0 cursor-pointer items-center justify-center gap-3 border-l border-edge text-white/75 transition-colors duration-300 hover:text-lime"
                  >
                    {/* Icon gets a slight bounce/rotation on hover via parent stagger/interactions if desired, 
                      but standard scale on the container feels solid. */}
                    <Icon aria-hidden className="size-7 shrink-0" />
                    <span className="font-display text-lg font-semibold tracking-[-0.01em]">
                      {v.label}
                    </span>
                  </m.span>
                );
              })}
            </Marquee>
          </m.div>
        </Container>
      </m.div>
    </section>
  );
}