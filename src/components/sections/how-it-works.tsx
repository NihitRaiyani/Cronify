"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { Aurora } from "@/components/primitives/aurora";
import { Container } from "@/components/primitives/container";
import { GlassCard } from "@/components/primitives/glass-card";
import { SectionHeading, Serif } from "@/components/primitives/section-heading";
import { HOW_IT_WORKS, type StepKey } from "@/content/how-it-works";
import { cn } from "@/lib/utils";
import {
  DiscoverVisual,
  GenerateVisual,
  ScoreVisual,
  ShareVisual,
} from "./how-it-works-visuals";

const VISUALS: Record<StepKey, React.ComponentType> = {
  discover: DiscoverVisual,
  score: ScoreVisual,
  generate: GenerateVisual,
  share: ShareVisual,
};

function StepBlock({
  index,
  onActive,
  registerRef,
  children,
}: {
  index: number;
  onActive: (i: number) => void;
  registerRef: (i: number, el: HTMLDivElement | null) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <div
      ref={(el) => {
        ref.current = el;
        registerRef(index, el);
      }}
      className="flex flex-col justify-center lg:min-h-[54vh]"
    >
      {children}
    </div>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const registerRef = useCallback((i: number, el: HTMLDivElement | null) => {
    blockRefs.current[i] = el;
  }, []);
  const scrollToStep = useCallback((i: number) => {
    blockRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 bg-night-950 py-24 lg:py-32"
    >
      <Aurora dim />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow={HOW_IT_WORKS.eyebrow}
              eyebrowGujarati={HOW_IT_WORKS.eyebrowGujarati}
              title={
                <>
                  {HOW_IT_WORKS.titleStart}{" "}
                  <Serif>{HOW_IT_WORKS.titleAccent}</Serif>
                </>
              }
              lede={HOW_IT_WORKS.lede}
            />
            <ol className="mt-10 hidden space-y-1.5 lg:block">
              {HOW_IT_WORKS.steps.map((step, i) => (
                <li key={step.key}>
                  <button
                    type="button"
                    onClick={() => scrollToStep(i)}
                    aria-current={active === i ? "step" : undefined}
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300",
                      active === i
                        ? "border-white/[0.1] bg-white/[0.05]"
                        : "border-transparent hover:bg-white/[0.02]",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-sm font-semibold tabular-nums transition-colors",
                        active === i ? "text-gradient-brand" : "text-ink-faint",
                      )}
                    >
                      {step.number}
                    </span>
                    <span className="flex flex-col">
                      <span
                        className={cn(
                          "font-display text-base font-semibold tracking-tight transition-colors",
                          active === i ? "text-ink" : "text-ink-dim",
                        )}
                      >
                        {step.title}
                      </span>
                      <span
                        className={cn(
                          "text-[13px] transition-colors",
                          active === i ? "text-ink-dim" : "text-ink-faint",
                        )}
                      >
                        {step.tagline}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-16 lg:space-y-6">
            {HOW_IT_WORKS.steps.map((step, i) => {
              const Visual = VISUALS[step.key];
              return (
                <StepBlock
                  key={step.key}
                  index={i}
                  onActive={setActive}
                  registerRef={registerRef}
                >
                  <Reveal>
                    <GlassCard className="bg-night-800/50 p-6 sm:p-8">
                      <Visual />
                    </GlassCard>
                    <div className="mt-6 flex items-baseline gap-3">
                      <span className="font-display text-sm font-semibold text-gradient-brand">
                        {step.number}
                      </span>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                        {step.title}
                        <span className="ml-2.5 text-base font-normal text-ink-faint">
                          {step.tagline}
                        </span>
                      </h3>
                    </div>
                    <p className="mt-2.5 max-w-lg text-[15px] leading-relaxed text-ink-dim">
                      {step.body}
                    </p>
                  </Reveal>
                </StepBlock>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
