import { ArrowRight, LayoutTemplate, ShieldCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Aurora } from "@/components/primitives/aurora";
import { Container } from "@/components/primitives/container";
import { Serif } from "@/components/primitives/section-heading";
import { Button } from "@/components/ui/button";
import { FINAL_CTA } from "@/content/final-cta";
import { cn } from "@/lib/utils";

/** Static glass chip pinned to a panel corner — a quiet echo of the hero's floating chips. */
function CornerChip({
  icon: Icon,
  value,
  label,
  iconClassName,
  className,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  iconClassName?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute hidden items-center gap-2.5 rounded-2xl border border-white/[0.1] bg-night-800/90 px-3.5 py-2.5 shadow-[0_16px_48px_-12px_rgba(7,11,22,0.95)] backdrop-blur-xl lg:flex",
        className,
      )}
    >
      <Icon className={cn("size-4", iconClassName)} />
      <span className="text-xs text-ink-dim">
        <span className="font-display text-sm font-semibold text-ink">{value}</span>{" "}
        {label}
      </span>
    </div>
  );
}

export function FinalCta() {
  return (
    <section
      id="cta"
      className="scroll-mt-24 overflow-x-clip bg-night-950 py-24 lg:py-32"
    >
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.1] bg-gradient-to-br from-brand-600/40 via-night-900 to-aqua-600/30 px-8 py-20 lg:px-24 lg:py-28">
            <Aurora />

            {/* thin top edge highlight */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.45] to-transparent"
            />

            <CornerChip
              icon={LayoutTemplate}
              value={FINAL_CTA.chips.templates.value}
              label={FINAL_CTA.chips.templates.label}
              iconClassName="text-brand-300"
              className="left-10 top-12 -rotate-6"
            />
            <CornerChip
              icon={ShieldCheck}
              value={FINAL_CTA.chips.firewall.value}
              label={FINAL_CTA.chips.firewall.label}
              iconClassName="text-aqua-300"
              className="bottom-12 right-10 rotate-3"
            />

            <div className="relative flex flex-col items-center gap-6 text-center">
              <p className="flex items-center gap-3">
                <span className="font-gujarati text-lg leading-none text-aqua-300">
                  {FINAL_CTA.gujarati}
                </span>
                <span aria-hidden className="h-4 w-px bg-white/[0.25]" />
                <span className="text-[12px] uppercase tracking-[0.2em] text-ink-dim">
                  {FINAL_CTA.gujaratiGloss}
                </span>
              </p>

              <h2 className="max-w-[17ch] font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-ink sm:text-6xl">
                {FINAL_CTA.titleStart}{" "}
                <Serif className="pr-1">{FINAL_CTA.titleAccent}</Serif>
              </h2>

              <p className="max-w-lg text-base leading-relaxed text-ink-dim sm:text-lg">
                {FINAL_CTA.lede}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  className="h-[3.25rem] rounded-full bg-ink px-8 text-[15px] font-semibold text-night-900 shadow-[0_12px_40px_-12px_rgba(232,237,248,0.5)] hover:bg-white"
                >
                  <a href={FINAL_CTA.primary.href}>
                    {FINAL_CTA.primary.label}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="h-[3.25rem] rounded-full border border-white/[0.12] px-7 text-[15px] text-ink hover:border-white/[0.24] hover:bg-white/[0.05]"
                >
                  <a href={FINAL_CTA.secondary.href}>{FINAL_CTA.secondary.label}</a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
