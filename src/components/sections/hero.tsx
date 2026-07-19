"use client";

import * as m from "motion/react-m";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { HERO } from "@/content/hero";
import { HeroVisual } from "./hero-visual";

/** Measured Solidroad entrance easing — shared by every hero element. */
const HERO_EASE = [0.6, 0, 0.05, 1] as const;

/** Bold lime journey line traced over the foreground peak (measured
 *  signature: ~500px squiggle crossing the sunlit ridge and the card's
 *  lower third; reframes with the cutout). */
function JourneyLine({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 560 300" fill="none" className={className}>
      <path
        d="M16 64 C 110 18, 156 208, 268 158 C 366 114, 396 262, 508 212 C 536 199, 552 202, 560 198"
        stroke="var(--accent-lime)"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Measured Solidroad hero, rebuilt with our own dusk photography:
 * 100vh photo scene (BG panorama static from first paint), left scrim at 0.5,
 * cream Fraunces 40/40 h1 at x=104 with 32px gaps down the stack, lime pill
 * CTA, white console card top-aligned with the h1 and bleeding 243px off the
 * right edge, sunlit foreground peak cutout + lime journey line painted OVER
 * the card's lower third, hard-cut seam into the body surface.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="theme-hero relative overflow-hidden bg-[#201918]"
      aria-label={HERO.ariaScene}
    >
      {/* BG dusk panorama — static from first paint (measured: no entrance).
          Plain <img>: sizes are pre-generated webp, the optimizer adds risk only. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-dusk-panorama-1920.webp"
        srcSet="/hero-dusk-panorama-1024.webp 1024w, /hero-dusk-panorama-1920.webp 1920w, /hero-dusk-panorama-2880.webp 2880w"
        sizes="100vw"
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* measured left scrim: 270° transparent→black, opacity 0.5, left half */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/2 opacity-50"
        style={{ background: "linear-gradient(270deg, rgba(0,0,0,0) 0%, #000 100%)" }}
      />

      <div className="relative mx-auto min-h-svh w-full max-w-[1600px] px-5 pb-40 pt-[26vh] sm:px-10 lg:h-svh lg:max-h-[980px] lg:min-h-[720px] lg:px-20 lg:pb-0 lg:pt-[200px]">
        {/* text column — measured x=104 (80 rail + 24), max-w 400, nav→h1 133,
            32px gaps h1→sub→CTA, staggers 0/50/100ms at 600ms */}
        <Stagger
          inView={false}
          step={0.05}
          className="relative z-30 max-w-[400px] lg:ml-6"
        >
          <StaggerItem duration={0.6} ease={HERO_EASE}>
            <h1 className="font-serif text-[34px] font-light leading-none tracking-[-0.02em] text-ink sm:text-[40px]">
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
              className="mt-8 inline-flex h-10 items-center gap-2 rounded-full bg-lime px-5 font-sans text-sm text-ink-inverse transition-transform duration-200 hover:-translate-y-0.5"
            >
              {HERO.cta.label}
              <span aria-hidden>→</span>
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
          className="mt-14 lg:absolute lg:right-[-243px] lg:top-[200px] lg:z-10 lg:mt-0"
        >
          <HeroVisual className="max-w-full lg:max-w-none" />
        </m.div>
      </div>

      {/* FG peak cutout + journey line — 24px rise, NO fade (measured),
          settles with the card so the card slides up behind the ridge */}
      <m.div
        aria-hidden
        data-reveal
        initial={{ y: 24 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: [...HERO_EASE] }}
        className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-peak-cutout-2200.webp"
          srcSet="/hero-peak-cutout-1280.webp 1280w, /hero-peak-cutout-2200.webp 2200w"
          sizes="62vw"
          alt=""
          width={2200}
          height={815}
          decoding="async"
          draggable={false}
          className="absolute bottom-0 right-0 w-[min(62vw,1100px)]"
        />
        <JourneyLine className="absolute bottom-10 right-4 w-[560px]" />
      </m.div>
    </section>
  );
}
