import { MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AnimatedNumber } from "@/components/primitives/animated-number";
import { Container } from "@/components/primitives/container";
import { GlassCard } from "@/components/primitives/glass-card";
import { ScoreMeter } from "@/components/primitives/score-meter";
import { SectionHeading, Serif } from "@/components/primitives/section-heading";
import { FROM_THE_FIELD } from "@/content/from-the-field";

const GHOST_ROWS = ["w-full", "w-4/5", "w-3/5"] as const;

export function FromTheField() {
  const { before, after } = FROM_THE_FIELD;
  return (
    <section
      id="from-the-field"
      className="scroll-mt-24 overflow-x-clip bg-night-900 py-24 lg:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={FROM_THE_FIELD.eyebrow}
          eyebrowGujarati={FROM_THE_FIELD.eyebrowGujarati}
          title={
            <>
              {FROM_THE_FIELD.titleStart} <Serif>{FROM_THE_FIELD.titleAccent}</Serif>
            </>
          }
          lede={FROM_THE_FIELD.lede}
        />
        <Reveal className="mt-16">
          <div role="img" aria-label={FROM_THE_FIELD.aria}>
            <div
              aria-hidden
              className="mx-auto grid max-w-4xl items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-7"
            >
              {/* before: the shop as discovery finds it */}
              <GlassCard className="flex flex-col bg-night-950/70 p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                  {before.header}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-ink">
                    <MapPin className="size-4 shrink-0 text-ink-faint" />
                    <span className="truncate">{before.shopLabel}</span>
                  </span>
                  <span className="shrink-0 rounded-full border border-spark-400/25 bg-spark-500/10 px-2.5 py-1 text-[11px] font-medium text-spark-300">
                    {before.chip}
                  </span>
                </div>
                <div className="mt-5">
                  <ScoreMeter score={before.score} />
                  <p className="mt-1.5 text-[11px] text-ink-faint">{before.scoreLabel}</p>
                </div>
                <div className="mt-auto space-y-2.5 pt-6">
                  {GHOST_ROWS.map((width) => (
                    <div key={width} className={`h-2 rounded bg-white/5 ${width}`} />
                  ))}
                </div>
              </GlassCard>

              {/* dashed arrow, vertical on mobile */}
              <div className="flex items-center justify-center">
                <svg
                  className="h-6 w-12 rotate-90 text-aqua-300/80 lg:rotate-0"
                  viewBox="0 0 48 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="animate-dash"
                    d="M2 12h40m0 0-7.5-7.5M42 12l-7.5 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="6 6"
                  />
                </svg>
              </div>

              {/* after: the draft the owner sees */}
              <GlassCard className="relative flex flex-col overflow-hidden border-spark-400/[0.18] bg-night-950/40 p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-card bg-gradient-to-br from-spark-400/[0.07] via-transparent to-transparent"
                />
                <p className="relative text-[11px] font-medium uppercase tracking-[0.18em] text-spark-300/80">
                  {after.header}
                </p>
                <div className="relative mt-5 flex-1 rounded-xl bg-[#FBF6EE] p-4">
                  <p className="font-gujarati text-xl font-semibold leading-snug text-night-800">
                    {after.brandLine}
                  </p>
                  <p className="mt-0.5 font-serif text-xs italic text-night-800/60">
                    {after.brandSub}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <span className="h-1.5 w-10 rounded-full bg-spark-500/70" />
                    <span className="h-1.5 w-6 rounded-full bg-spark-400/50" />
                    <span className="h-1.5 w-8 rounded-full bg-spark-500/35" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between rounded-lg border border-night-900/[0.08] bg-white/70 px-3 py-2.5">
                      <span className="h-2 w-24 rounded bg-night-900/20" />
                      <span className="h-2 w-8 rounded bg-night-900/10" />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-night-900/[0.08] bg-white/70 px-3 py-2.5">
                      <span className="h-2 w-20 rounded bg-night-900/20" />
                      <span className="h-2 w-10 rounded bg-night-900/10" />
                    </div>
                  </div>
                  <span className="mt-4 inline-flex rounded-full border border-spark-500/40 bg-spark-500/10 px-2.5 py-1 text-[10px] font-medium text-[#8a5b10]">
                    {after.chip}
                  </span>
                </div>
              </GlassCard>
            </div>
          </div>
        </Reveal>

        {/* structural truths only — the numbers the product is made of */}
        <Stagger className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:mt-20 lg:grid-cols-5">
          {FROM_THE_FIELD.counters.map((counter) => (
            <StaggerItem
              key={counter.label}
              className="flex flex-col items-center gap-1.5 text-center last:col-span-2 sm:last:col-span-1"
            >
              <AnimatedNumber
                value={counter.value}
                className="font-display text-4xl font-semibold text-ink"
              />
              <span className="text-xs text-ink-faint">{counter.label}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
