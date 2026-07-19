"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Check,
  Gauge,
  MessagesSquare,
  PenLine,
  Radar,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { AI_WORKFLOW } from "@/content/ai-workflow";
import { cn } from "@/lib/utils";

type Mode = (typeof AI_WORKFLOW.modes)[number];

const MODE_ICONS: Record<Mode["icon"], LucideIcon> = {
  radar: Radar,
  gauge: Gauge,
  pen: PenLine,
  chat: MessagesSquare,
};

/** Measured ref behavior: tabs auto-advance every ~5s with a linear
 *  progress fill behind the active label; manual clicks reset the timer. */
const AUTOPLAY_MS = 5000;

export function AiWorkflow() {
  const [idx, setIdx] = useState(0);
  const activeMode = AI_WORKFLOW.modes[idx];

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % AI_WORKFLOW.modes.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(t);
  }, [idx]);

  return (
    <section id="ai-workflow" className="relative overflow-x-clip pt-[140px]">
      <Container>
        <SectionHeading title={AI_WORKFLOW.title} lede={AI_WORKFLOW.lede} />

        {/* tab bar — blur-rises as one block (measured ~87% vh) */}
        <Reveal className="mt-[60px]">
          <div
            role="tablist"
            aria-label={AI_WORKFLOW.title}
            className="mx-auto grid max-w-[840px] grid-cols-2 gap-1 bg-black/40 p-2 sm:flex sm:items-stretch sm:gap-0"
          >
            {AI_WORKFLOW.modes.map((mode, i) => {
              const Icon = MODE_ICONS[mode.icon];
              const isActive = i === idx;
              return (
                <Fragment key={mode.key}>
                  {i > 0 ? (
                    <span
                      aria-hidden
                      className="hidden h-6 w-px self-center bg-edge sm:block"
                    />
                  ) : null}
                  <button
                    type="button"
                    role="tab"
                    id={`ai-workflow-tab-${mode.key}`}
                    aria-selected={isActive}
                    aria-controls={`ai-workflow-panel-${mode.key}`}
                    onClick={() => setIdx(i)}
                    className={cn(
                      "relative flex flex-1 items-center justify-center gap-2 overflow-hidden border px-3 py-3 font-sans text-base font-medium transition-colors",
                      isActive
                        ? "border-lime bg-surface-deep text-lime"
                        : "border-transparent text-ink hover:text-lime",
                    )}
                  >
                    {isActive ? (
                      <m.span
                        aria-hidden
                        key={idx}
                        className="absolute bottom-0 left-0 h-0.5 bg-lime/80"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                      />
                    ) : null}
                    <Icon aria-hidden className="size-[18px] shrink-0" />
                    {mode.label}
                  </button>
                </Fragment>
              );
            })}
          </div>
        </Reveal>

        {/* panel — blur-rises at ~76–80% vh; panes cross-fade 500ms in / 350ms out */}
        <Reveal margin="0px 0px -21% 0px" className="mt-8">
          <div className="bg-surface-deep p-6 lg:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={activeMode.key}
                role="tabpanel"
                id={`ai-workflow-panel-${activeMode.key}`}
                aria-labelledby={`ai-workflow-tab-${activeMode.key}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid gap-10 lg:grid-cols-2 lg:items-center"
              >
                <div
                  aria-hidden
                  className="stripes-lime aspect-square w-full max-w-[560px]"
                />
                <div className="max-w-full">
                  <span className="grid size-12 place-items-center rounded-md bg-black/25 text-lime">
                    {(() => {
                      const Icon = MODE_ICONS[activeMode.icon];
                      return <Icon aria-hidden className="size-6" />;
                    })()}
                  </span>
                  <h3 className="mt-10 max-w-md font-display text-[26px] font-semibold leading-[1.3] text-ink sm:text-[32px]">
                    {activeMode.heading}
                  </h3>
                  <ul className="mt-6 grid gap-6">
                    {activeMode.points.map((point) => (
                      <li key={point} className="flex items-center gap-3">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-check">
                          <Check
                            aria-hidden
                            strokeWidth={3.5}
                            className="size-3 text-ink-inverse"
                          />
                        </span>
                        <span className="font-sans text-base leading-6 text-ink">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
