"use client";

import * as m from "motion/react-m";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { HERO } from "@/content/hero";
import { HeroVisual } from "./hero-visual";

/** Measured Solidroad entrance easing — shared by every hero element. */
const HERO_EASE = [0.6, 0, 0.05, 1] as const;

/** Hand-drawn lime journey line over the foreground peak (measured signature:
 *  filled variable-width scribble, not a stroke — thin curl at the summit,
 *  thickening descent down the face, ~17px belly, rising sweep that bleeds off
 *  the right viewport edge; static art, rides the layer's 24px entrance rise).
 *  ViewBox matches the peak cutout's rendered box so the line tracks the ridge
 *  at every viewport width. Path is our own generated outline. */
function JourneyLine({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 893 331" fill="none" className={className}>
      <path
        fill="var(--accent-lime)"
        d="M575.9 29.4 L573.8 25.9 570.7 20.6 567.1 15.3 563.7 11.3 560.3 8.7 556.9 7.1 553.5 6.3 550.5 6.8 548.1 8.5 546.7 11.3 545.6 14.6 545.5 18.2 546.2 22 548.2 25.6 550.3 29.7 552.5 34.6 554.4 40.7 556.4 47.7 558.9 55.1 561.4 62.9 564.5 70.9 566.9 79.7 569.8 88.6 572.1 97.5 575.5 105.8 578.6 114.2 582.5 122.3 586.1 130.3 589.9 137.9 594.5 144.9 599.8 151.4 606.6 156.4 613.3 161.7 620.8 165.5 627.9 170.4 635.8 172.6 643.6 175 651.8 175.1 659.9 176.5 668.2 177.3 676.8 177.5 685.5 176.4 693.7 173.5 701.8 171.5 709.4 168.9 717.2 168.1 724.6 164.9 733.2 162.1 742.2 156.6 752.7 152.4 763.6 147.3 775.3 143.1 787.1 137.7 799.1 131.1 811.2 124.7 822.6 118.4 833.9 114.2 844 109.1 854.5 104.9 864.6 98.6 877.2 93.1 890.9 86.5 903.9 82 912.7 78.3 L907.3 65.7 898.5 69.6 886.4 76 872.2 81.6 859.4 87.4 848 91.1 838 96.6 827.7 101.4 817.4 107.6 805.4 112.6 792.9 118.1 780.3 123.4 768.7 128.9 758 134.8 747.1 139.3 736.9 143.8 726.8 145.9 718.8 149.5 711.6 151.5 705.4 155.2 698.2 156.5 690.5 158.1 682.5 158.4 675 159.5 667.8 160.7 660.8 161.1 653.7 161.2 647 158.7 640.2 157.4 633.4 154.9 625.9 154 619.5 150.8 613.4 147.6 608.8 142.5 603.7 137.4 598.8 131.8 593.9 125.7 589.6 118.9 586.4 111 582.9 102.9 579.9 94.5 575.8 86.4 572.6 77.8 569.1 69.3 566.6 61.1 563.7 53.5 561 46.1 558.1 39.3 555.5 33.4 553.3 28.3 551.1 24.1 549.6 20.6 548.5 17.8 548.5 14.9 548.9 12.2 550.2 10.3 551.5 9.2 553.4 9.1 556.1 9.4 559.3 10.6 562.3 12.7 565.4 16.5 568.8 21.9 571.9 27 574.1 30.6 Z"
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
          Measured Solidroad zoom: the photo box overscans the hero by ~250px
          top and bottom at 900vh (1400-tall box, ±28%), so object-cover crops
          in ~1.55x tighter than a plain fill. The section's overflow-hidden
          clips the overscan. Plain <img>: sizes are pre-generated webp, the
          optimizer adds risk only. */}
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
        className="absolute left-0 w-full object-cover"
        style={{ top: "-28%", height: "156%" }}
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
          className="absolute bottom-0 right-0 w-[min(75vw,1330px)]"
        />
        <JourneyLine className="absolute bottom-0 right-0 w-[min(75vw,1330px)]" />
      </m.div>
    </section>
  );
}
