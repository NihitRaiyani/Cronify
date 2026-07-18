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
import { Container } from "@/components/primitives/container";
import { BUILT_FOR, type VerticalKey } from "@/content/built-for";

const ICONS: Record<VerticalKey, LucideIcon> = {
  restaurant: UtensilsCrossed,
  clinic: Stethoscope,
  gym: Dumbbell,
  clothing: Shirt,
  salon: Scissors,
  electronics: Smartphone,
};

export function BuiltFor() {
  return (
    <section className="border-y border-white/[0.04] bg-night-900 py-14">
      <Container className="mb-8 flex flex-col items-center gap-2 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-faint">
          {BUILT_FOR.kicker}
          <span className="ml-3 font-gujarati text-[13px] normal-case tracking-normal text-ink-faint/80">
            {BUILT_FOR.kickerGujarati}
          </span>
        </p>
      </Container>
      <Marquee trackClassName="gap-5 pr-5">
        {BUILT_FOR.verticals.map((v) => {
          const Icon = ICONS[v.key];
          return (
            <span
              key={v.key}
              className="flex items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.03] py-3 pl-4 pr-6"
            >
              <span className="grid size-9 place-items-center rounded-full border border-white/[0.06] bg-gradient-to-br from-brand-500/[0.18] to-aqua-500/[0.12] text-aqua-300">
                <Icon className="size-4" />
              </span>
              <span className="text-sm font-medium text-ink">{v.label}</span>
              <span className="font-gujarati text-sm text-ink-faint">
                {v.gujarati}
              </span>
            </span>
          );
        })}
      </Marquee>
      <Container className="mt-8">
        <p className="mx-auto max-w-xl text-center text-sm leading-relaxed text-ink-faint">
          {BUILT_FOR.note}
        </p>
      </Container>
    </section>
  );
}
