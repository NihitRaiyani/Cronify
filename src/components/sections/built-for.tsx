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

/** One set is 6 cells x 253px = 1518px, narrower than a normal desktop viewport.
 *  Two sets per half (3036px) clears the widest screen we support, so the band
 *  never runs out of content at the right edge mid-loop. */
const SETS_PER_HALF = 2;

/**
 * The scrolling vertical band directly under the hero. It reads as a
 * continuation of the hero rather than a new section: the hero's hard seam
 * bleeds its dusk tone down into the band's top before settling on the body
 * surface.
 */
export function BuiltFor() {
  return (
    <section id="built-for" className="relative overflow-x-clip pt-12">
      {/* carries the hero's dusk brown into the body surface so the hard cut at
          the hero's base has somewhere to land */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(32,25,24,0.55)_0%,rgba(32,25,24,0)_100%)]"
      />
      <Reveal className="relative px-6 text-center">
        <p className="font-display text-2xl font-medium leading-tight text-ink">
          {BUILT_FOR.kicker}
          <span className="ml-3 font-gujarati text-lg font-normal text-lime/90">
            {BUILT_FOR.kickerGujarati}
          </span>
        </p>
      </Reveal>
      <Reveal className="relative mt-10">
        <Marquee
          className="border-y border-edge [mask-image:none]"
          trackClassName="gap-0 pr-0"
          setsPerHalf={SETS_PER_HALF}
          pauseOnHover
        >
          {BUILT_FOR.verticals.map((v) => {
            const Icon = ICONS[v.key];
            return (
              <span
                key={v.key}
                className="flex h-[100px] w-[253px] shrink-0 items-center justify-center gap-3 border-l border-edge text-white/75 transition-colors duration-300 hover:text-lime"
              >
                <Icon aria-hidden className="size-7 shrink-0" />
                <span className="font-display text-lg font-semibold tracking-[-0.01em]">
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
