"use client";

import { useState } from "react";
import { Building2, Check, Footprints, Route } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AButton } from "@/components/primitives/a-button";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { PRICING } from "@/content/pricing";
import { cn } from "@/lib/utils";

const PLAN_ICONS = {
  walk: Footprints,
  run: Route,
  grow: Building2,
} as const;

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 overflow-x-clip pt-[140px]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={PRICING.eyebrow}
            eyebrowGujarati={PRICING.eyebrowGujarati}
            title={PRICING.title}
            lede={PRICING.lede}
          />

          {/* Billing toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={cn(
                "font-sans text-lg font-semibold transition-colors",
                yearly ? "text-ink-muted" : "text-ink",
              )}
            >
              {PRICING.billing.monthly}
            </button>
            <button
              type="button"
              role="switch"
              aria-checked={yearly}
              aria-label="Billed yearly"
              onClick={() => setYearly((v) => !v)}
              className="relative h-7 w-[52px] rounded-full border border-edge bg-surface-deep transition-colors"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute top-1/2 size-5 -translate-y-1/2 rounded-full bg-lime transition-[left] duration-200",
                  yearly ? "left-[26px]" : "left-1",
                )}
              />
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={cn(
                "font-sans text-lg font-semibold transition-colors",
                yearly ? "text-ink" : "text-ink-muted",
              )}
            >
              {PRICING.billing.yearly}
            </button>
          </div>
        </Reveal>

        {/* Plan columns */}
        <Stagger className="mt-12 grid border border-edge lg:grid-cols-3 lg:divide-x lg:divide-edge max-lg:divide-y max-lg:divide-edge">
          {PRICING.plans.map((plan, i) => {
            const Icon = PLAN_ICONS[plan.icon];
            const featured = i === 1;
            return (
              <StaggerItem
                key={plan.label}
                className={cn("flex flex-col p-8", featured && "bg-surface-deep")}
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-tile">
                    <Icon className="size-[18px] text-ink-inverse" strokeWidth={2} />
                  </span>
                  <span className="font-sans text-base leading-6 text-ink">
                    {plan.label}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-[52px] font-bold leading-none tracking-tight text-ink">
                    {yearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.suffix ? (
                    <span className="font-sans text-base leading-6 text-ink-muted">
                      {plan.suffix}
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 font-sans text-base leading-6 text-ink-muted">
                  {plan.spec}
                </p>

                <AButton href="#" className="mt-8 w-full">
                  {plan.cta}
                </AButton>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-check">
                        <Check
                          className="size-3 text-ink-inverse"
                          strokeWidth={3}
                        />
                      </span>
                      <span className="font-sans text-base leading-6 text-ink">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
