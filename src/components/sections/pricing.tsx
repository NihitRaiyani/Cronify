import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Aurora } from "@/components/primitives/aurora";
import { Container } from "@/components/primitives/container";
import { GlassCard } from "@/components/primitives/glass-card";
import { SectionHeading, Serif } from "@/components/primitives/section-heading";
import { Button } from "@/components/ui/button";
import { PRICING } from "@/content/pricing";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 overflow-x-clip bg-night-950 py-24 lg:py-32"
    >
      <Aurora dim />
      <Container className="relative">
        <SectionHeading
          eyebrow={PRICING.eyebrow}
          eyebrowGujarati={PRICING.eyebrowGujarati}
          title={
            <>
              {PRICING.titleStart} <Serif>{PRICING.titleAccent}</Serif>
            </>
          }
          lede={PRICING.lede}
        />
        <Reveal className="mx-auto mt-14 w-full max-w-3xl">
          <GlassCard className="relative overflow-hidden bg-night-900/60 p-7 sm:p-10">
            {/* thin gradient top border + corner glow */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent"
            />
            <div
              aria-hidden
              className="absolute -right-20 -top-24 size-56 rounded-full bg-brand-500/[0.14] blur-3xl"
            />
            <div className="relative flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                {PRICING.panel.title}
              </h3>
              <span className="inline-flex items-center gap-2 rounded-full border border-aqua-400/25 bg-aqua-400/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-aqua-300">
                <span aria-hidden className="size-1.5 rounded-full bg-aqua-400" />
                {PRICING.panel.chip}
              </span>
            </div>
            <ul className="relative mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {PRICING.panel.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-ink-dim"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-aqua-400/25 bg-aqua-400/10">
                    <Check className="size-3 text-aqua-300" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="relative mt-8 border-t border-white/[0.06] pt-6 text-sm leading-relaxed text-ink-faint">
              {PRICING.panel.note}
            </p>
            <div className="relative mt-7 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="h-12 rounded-full bg-ink px-7 text-[15px] font-semibold text-night-900 shadow-[0_12px_40px_-12px_rgba(232,237,248,0.5)] hover:bg-white"
              >
                <a href={PRICING.cta.href}>{PRICING.cta.label}</a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-12 rounded-full border border-white/[0.1] px-6 text-[15px] text-ink hover:border-white/[0.2] hover:bg-white/[0.04]"
              >
                <a href={PRICING.secondaryCta.href}>
                  {PRICING.secondaryCta.label}
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  );
}
