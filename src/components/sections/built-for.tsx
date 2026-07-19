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
import { Reveal } from "@/components/motion/reveal";
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
    <section id="built-for" className="relative overflow-x-clip pt-20">
      <Reveal className="px-6 text-center">
        <p className="font-display text-2xl font-medium leading-tight text-ink">
          {BUILT_FOR.kicker}
          <span className="ml-3 font-gujarati text-lg font-normal text-lime/90">
            {BUILT_FOR.kickerGujarati}
          </span>
        </p>
      </Reveal>
      <Reveal className="mt-10">
        <Marquee
          className="border-y border-edge [mask-image:none]"
          trackClassName="gap-0 pr-0"
        >
          {BUILT_FOR.verticals.map((v) => {
            const Icon = ICONS[v.key];
            return (
              <span
                key={v.key}
                className="flex h-[100px] w-[253px] shrink-0 items-center justify-center gap-3 border-l border-edge text-white/55"
              >
                <Icon aria-hidden className="size-6" />
                <span className="font-display text-lg font-semibold">
                  {v.label}
                </span>
              </span>
            );
          })}
        </Marquee>
      </Reveal>
    </section>
  );
}
