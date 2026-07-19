import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { HERO } from "@/content/hero";
import { HeroVisual } from "./hero-visual";

/**
 * Measured Solidroad hero: full-viewport photo-dark scene (ours is a layered
 * SVG dusk ridge, not their photo), cream serif 40px headline, 14px sub, lime
 * pill CTA, white dashboard card bleeding off the right edge and sliding
 * BEHIND the sunlit near ridge, lime journey line emerging below the card,
 * bottom fade into the body surface (#0E0D14) as the seam.
 */
function SkyAndFarRidges() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#42566E" />
          <stop offset="0.34" stopColor="#3A4D63" />
          <stop offset="0.55" stopColor="#7A6650" />
          <stop offset="0.7" stopColor="#4A3A2E" />
          <stop offset="1" stopColor="#241C18" />
        </linearGradient>
        <linearGradient id="ridge-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6E5F49" />
          <stop offset="1" stopColor="#3A3128" />
        </linearGradient>
        <linearGradient id="ridge-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#54432F" />
          <stop offset="1" stopColor="#2A2119" />
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#sky)" />
      <path
        d="M0 560 L180 480 L340 540 L520 430 L700 520 L880 440 L1060 530 L1240 460 L1440 540 L1440 900 L0 900 Z"
        fill="url(#ridge-far)"
        opacity="0.9"
      />
      <path
        d="M0 640 L160 570 L330 640 L540 540 L760 640 L950 550 L1150 660 L1330 580 L1440 630 L1440 900 L0 900 Z"
        fill="url(#ridge-mid)"
        opacity="0.95"
      />
    </svg>
  );
}

/** Near ridge + journey line — rendered ABOVE the dashboard card (measured
 *  composition: the sunlit foreground peak overlaps the card's bottom edge). */
function NearRidge() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="ridge-near-lit" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#33281D" />
          <stop offset="0.55" stopColor="#7A5533" />
          <stop offset="0.75" stopColor="#A06C42" />
          <stop offset="1" stopColor="#1B1512" />
        </linearGradient>
      </defs>
      <path
        d="M0 780 L240 690 L460 770 L680 660 L900 780 L1120 640 L1310 770 L1440 700 L1440 900 L0 900 Z"
        fill="url(#ridge-near-lit)"
      />
      {/* shadow flank on the big foreground peak */}
      <path
        d="M900 780 L1120 640 L1190 690 L1000 800 Z"
        fill="#241B14"
        opacity="0.55"
      />
      {/* the journey line, tracing the lit ridge below the card */}
      <path
        d="M990 760 C 1090 690, 1180 800, 1290 735 C 1370 690, 1420 720, 1460 695"
        fill="none"
        stroke="#DBF400"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="theme-hero relative overflow-hidden bg-[#201918]"
      aria-label={HERO.ariaScene}
    >
      <SkyAndFarRidges />
      {/* measured 40% black overlay (scene is built darker than their photo,
          so a lighter veil lands at the same measured luminance) */}
      <div aria-hidden className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto min-h-svh w-full max-w-[1600px] px-5 pb-40 pt-[26vh] sm:px-10 lg:h-svh lg:max-h-[980px] lg:min-h-[720px] lg:px-20 lg:pb-0 lg:pt-[205px]">
        {/* dashboard card — bleeds off the right edge, behind the near ridge */}
        <Stagger inView={false} delay={0.25}>
          <StaggerItem
            y={36}
            className="mt-14 lg:absolute lg:right-[-140px] lg:top-[175px] lg:z-10 lg:mt-0"
          >
            <HeroVisual className="max-w-full lg:max-w-none" />
          </StaggerItem>
        </Stagger>

        <Stagger
          inView={false}
          className="relative z-30 max-w-md lg:ml-[110px]"
        >
          <StaggerItem>
            <h1 className="font-serif text-[34px] font-light leading-[1.02] tracking-[-0.02em] text-ink sm:text-[40px]">
              {HERO.titleLine1}
              <br />
              {HERO.titleLine2}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 max-w-[380px] font-sans text-sm leading-[1.45] text-ink-muted">
              {HERO.sub}
            </p>
          </StaggerItem>
          <StaggerItem>
            <a
              href={HERO.cta.href}
              className="mt-8 inline-flex h-10 items-center gap-2 rounded-full bg-lime px-5 font-sans text-sm font-medium text-ink-inverse transition-transform duration-200 hover:-translate-y-0.5"
            >
              {HERO.cta.label}
              <span aria-hidden>→</span>
            </a>
          </StaggerItem>
        </Stagger>
      </div>

      {/* foreground ridge over the card */}
      <div aria-hidden className="absolute inset-0 z-20 hidden lg:block">
        <NearRidge />
      </div>

      {/* seam: fade into the body surface, above everything decorative */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-b from-transparent to-[#0E0D14]"
      />
    </section>
  );
}
