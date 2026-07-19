import { BadgeCheck, Languages, LayoutList, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AButton } from "@/components/primitives/a-button";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { SHOWCASE } from "@/content/showcase";

const POINT_ICONS: LucideIcon[] = [Languages, LayoutList, BadgeCheck];

/** Warm interior-light scene — pure CSS stand-in for the ref's full-bleed photo. */
function WarmScene() {
  return (
    <div aria-hidden className="absolute inset-0">
      {/* base warm neutrals */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(96deg, #2a231c 0%, #4a4034 30%, #7b6d58 60%, #8d7f6a 100%)",
        }}
      />
      {/* bright cream wall glow — lg only, so stacked mobile copy stays legible */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          backgroundImage: [
            "radial-gradient(130% 150% at 70% 18%, rgba(228,222,212,0.98) 0%, rgba(219,211,197,0.88) 40%, rgba(198,186,164,0.5) 62%, transparent 80%)",
            "radial-gradient(50% 60% at 34% 26%, rgba(214,204,188,0.45) 0%, transparent 65%)",
          ].join(", "),
        }}
      />
      {/* warm wood floor band */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(148,105,62,0.92) 0%, rgba(133,94,56,0.66) 10%, rgba(102,72,46,0.3) 22%, transparent 36%)",
        }}
      />
      {/* left legibility wash + vignette */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(90deg, rgba(22,17,12,0.68) 0%, rgba(22,17,12,0.34) 26%, transparent 48%)",
            "radial-gradient(140% 120% at 56% 40%, transparent 62%, rgba(14,10,7,0.35) 100%)",
          ].join(", "),
        }}
      />
    </div>
  );
}

/** Our mini demo-site wireframe in a small white browser card. */
function DemoMock() {
  const m = SHOWCASE.mock;
  return (
    <div aria-hidden className="overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_rgba(10,8,6,0.4)]">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-black/[0.08] bg-[#f4f1ec] px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-black/15" />
          <span className="size-2 rounded-full bg-black/15" />
          <span className="size-2 rounded-full bg-black/15" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-sm bg-white px-2.5 py-1 text-[10px] leading-none text-black/45">
          {m.address}
        </span>
        <span className="font-gujarati text-[9px] leading-none text-black/40">{m.lang}</span>
      </div>
      {/* page */}
      <div className="p-4">
        {/* site header */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-gujarati text-[13px] font-semibold leading-tight text-[#161310]">
              {m.name}
            </p>
            <p className="text-[9px] uppercase tracking-[0.14em] text-black/40">{m.nameSub}</p>
          </div>
          <span className="flex shrink-0 gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-black/10" />
            <span className="h-1.5 w-6 rounded-full bg-black/10" />
            <span className="h-1.5 w-6 rounded-full bg-black/10" />
          </span>
        </div>
        {/* hero block */}
        <div className="mt-3 rounded-md bg-gradient-to-br from-[#f3eada] to-[#e2d0b4] p-3.5">
          <p className="font-gujarati text-[15px] font-semibold leading-snug text-[#2a2119]">
            {m.heroTitle}
          </p>
          <p className="mt-1 text-[10px] leading-snug text-[#6b5a44]">{m.heroSub}</p>
          <span className="mt-2.5 inline-block bg-lime px-2.5 py-1 font-gujarati text-[10px] font-semibold leading-none text-ink-inverse">
            {m.heroCta}
          </span>
        </div>
        {/* fact-backed strips */}
        {m.strips.map((strip) => (
          <div
            key={strip.label}
            className="mt-2 flex items-center justify-between gap-3 rounded-md border border-black/[0.07] bg-[#faf8f4] px-3 py-2"
          >
            <div className="min-w-0">
              <p className="font-gujarati text-[11px] font-semibold leading-tight text-[#241f19]">
                {strip.label}
              </p>
              <p className="mt-0.5 text-[9px] leading-none text-black/40">{strip.sub}</p>
            </div>
            {"chip" in strip ? (
              <span className="shrink-0 rounded-full bg-[#eef6df] px-2 py-1 font-gujarati text-[9px] font-semibold leading-none text-[#3c5220]">
                {strip.chip}
              </span>
            ) : null}
          </div>
        ))}
        {/* hidden strip — fact unknown */}
        <div className="mt-2 rounded-md border border-dashed border-black/20 px-3 py-2.5 text-center text-[9px] uppercase tracking-[0.16em] text-black/35">
          {m.hidden}
        </div>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section id="showcase" className="relative scroll-mt-24 overflow-x-clip bg-surface pt-[140px]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={SHOWCASE.eyebrow}
            eyebrowGujarati={SHOWCASE.eyebrowGujarati}
            title={SHOWCASE.title}
            lede={SHOWCASE.lede}
          />
        </Reveal>

        {/* full-width warm scene panel */}
        <Reveal delay={0.1}>
          <div className="relative mt-[60px] overflow-hidden lg:h-[630px]">
            <WarmScene />
            <div className="relative flex flex-col items-start gap-8 p-6 sm:p-10 lg:static lg:p-0">
              <p className="max-w-md font-sans text-base font-semibold leading-6 text-ink lg:absolute lg:left-6 lg:top-[270px]">
                {SHOWCASE.overlay}
              </p>
              <div className="lg:absolute lg:bottom-[120px] lg:left-6">
                <AButton href="#">{SHOWCASE.cta}</AButton>
              </div>
              <div
                role="img"
                aria-label={SHOWCASE.mockAria}
                className="w-full max-w-[420px] lg:absolute lg:right-24 lg:top-1/2 lg:w-[420px] lg:-translate-y-1/2"
              >
                <DemoMock />
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3-up hairline list. inView={false}: this sits ~1100px below the
            section top — page smooth-scroll keeps IO from firing reliably, so
            it plays on mount like the hero. */}
        <Stagger inView={false} className="grid border-l border-edge lg:grid-cols-3">
          {SHOWCASE.points.map((point, i) => {
            const Icon = POINT_ICONS[i];
            return (
              <StaggerItem
                key={point.title}
                className="border-r border-edge px-6 pb-9 pt-10"
              >
                <span className="grid size-9 place-items-center rounded-md bg-surface-deep text-check">
                  <Icon className="size-4" strokeWidth={2} />
                </span>
                <h4 className="mt-9 font-display text-2xl font-medium leading-[1.6] text-ink">
                  {point.title}
                </h4>
                <p className="mt-3 max-w-[38ch] font-sans text-base leading-6 text-ink-muted">
                  {point.body}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
