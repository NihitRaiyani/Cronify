"use client";

import * as m from "motion/react-m";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { HERO } from "@/content/hero";
import { HeroBackdrop, HeroRidge } from "./hero-scene";
import { HeroVisual } from "./hero-visual";

/** Measured Solidroad entrance easing — shared by every hero element. */
const HERO_EASE = [0.6, 0, 0.05, 1] as const;

/**
 * Measured Solidroad hero, rebuilt on our own dusk photography:
 * 100vh photo scene (backdrop static from first paint), left scrim at 0.5,
 * cream Fraunces 40/40 h1 at x=104 with 32px gaps down the stack, lime pill
 * CTA, white console card top-aligned with the h1 and bleeding 243px off the
 * right edge, sunlit foreground peak + lime journey line painted OVER the
 * card's lower third, hard-cut seam into the body surface.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="theme-hero relative overflow-hidden bg-[#201918]"
      aria-label={HERO.ariaScene}
    >
      <HeroBackdrop />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-[150px] pt-[12vh] sm:px-10 sm:pb-[200px] md:pb-[280px] lg:h-svh lg:max-h-[980px] lg:min-h-[720px] lg:px-20 lg:pb-0 lg:pt-[200px]">
        {/* text column — measured x=104 (80 rail + 24), max-w 400, nav→h1 133,
            32px gaps h1→sub→CTA, staggers 0/50/100ms at 600ms */}
        <Stagger
          inView={false}
          step={0.05}
          className="relative z-30 max-w-[400px] lg:ml-6"
        >
          <StaggerItem duration={0.6} ease={HERO_EASE}>
            <h1 className="font-serif text-[34px] font-light leading-none tracking-[-0.02em] text-ink sm:text-[40px] xl:text-[44px]">
              {HERO.titleLine1}
              <br />
              {HERO.titleLine2}
            </h1>
          </StaggerItem>
          <StaggerItem duration={0.6} ease={HERO_EASE}>
            <p className="mt-8 max-w-[340px] font-sans text-sm leading-[1.4] text-ink-muted">
              {HERO.sub}
            </p>
          </StaggerItem>
          <StaggerItem duration={0.6} ease={HERO_EASE}>
            <a
              href={HERO.cta.href}
              className="group mt-8 inline-flex h-10 items-center gap-2 rounded-full bg-lime px-5 font-sans text-sm text-ink-inverse transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_var(--accent-lime)] focus-visible:-translate-y-0.5 focus-visible:shadow-[0_10px_30px_-8px_var(--accent-lime)]"
            >
              {HERO.cta.label}
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
              >
                →
              </span>
            </a>
          </StaggerItem>
        </Stagger>

        {/* console card — measured (≈627, 200): top-aligned with the h1,
            bleeding 243px off-right; 40px rise + fade over 1.2s, lands last */}
        <m.div
          data-reveal
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [...HERO_EASE] }}
          // The -243px bleed is measured against the viewport edge, but the
          // container caps at 1600px — so past that width the offset has to
          // absorb the container's own margin or the card stops bleeding.
          className="relative z-10 mt-10 lg:absolute lg:right-[calc(-243px_-_max(0px,(100vw_-_1600px)/2))] lg:top-[200px] lg:mt-0"
        >
          {/* Below lg the card keeps its proportions and bleeds off the right
              edge (measured: the ref crops rather than reflows) — letting it
              shrink to fit instead wraps every cell and doubles the hero's
              height. The section's overflow-hidden does the cropping. */}
          {/* 510px keeps the Score column — the card's whole point — inside the
              crop down to a 360px viewport. */}
          <HeroVisual className="w-[510px] sm:w-[840px] md:w-[960px] lg:w-[1050px]" />
        </m.div>
      </div>

      {/* FG peak + journey line — 24px rise, NO fade (measured), settles with
          the card so the card slides up behind the ridge */}
      <m.div
        data-reveal
        initial={{ y: 24 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: [...HERO_EASE] }}
        className="pointer-events-none absolute inset-0 z-20"
      >
        <HeroRidge />
      </m.div>
    </section>
  );
}
