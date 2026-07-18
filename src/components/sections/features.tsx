import {
  Gauge,
  IndianRupee,
  Languages,
  ListOrdered,
  Radar,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/primitives/container";
import { GlassCard } from "@/components/primitives/glass-card";
import { SectionHeading, Serif } from "@/components/primitives/section-heading";
import { FEATURES, type FeatureKey } from "@/content/features";

const ICONS: Record<FeatureKey, LucideIcon> = {
  discovery: Radar,
  score: Gauge,
  language: Languages,
  firewall: ShieldCheck,
  neediest: ListOrdered,
  pricing: IndianRupee,
};

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-night-900 py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow={FEATURES.eyebrow}
          eyebrowGujarati={FEATURES.eyebrowGujarati}
          title={
            <>
              {FEATURES.titleStart} <Serif>{FEATURES.titleAccent}</Serif>
            </>
          }
          lede={FEATURES.lede}
        />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.items.map((item) => {
            const Icon = ICONS[item.key];
            return (
              <StaggerItem key={item.key} className="h-full">
                <GlassCard
                  interactive
                  className="group h-full bg-night-800/40 p-7"
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-white/[0.08] bg-gradient-to-br from-brand-500/[0.22] to-aqua-500/[0.14] text-aqua-300 transition-colors duration-300 group-hover:border-aqua-400/40 group-hover:text-aqua-200">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-dim">
                    {item.body}
                  </p>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
