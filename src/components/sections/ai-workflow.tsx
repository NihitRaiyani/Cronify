"use client";

import { Fragment, useState } from "react";
import {
  Check,
  Gauge,
  MessagesSquare,
  PenLine,
  Radar,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { AI_WORKFLOW } from "@/content/ai-workflow";
import { cn } from "@/lib/utils";

type Mode = (typeof AI_WORKFLOW.modes)[number];
type ModeKey = Mode["key"];

const MODE_ICONS: Record<Mode["icon"], LucideIcon> = {
  radar: Radar,
  gauge: Gauge,
  pen: PenLine,
  chat: MessagesSquare,
};

export function AiWorkflow() {
  const [active, setActive] = useState<ModeKey>(AI_WORKFLOW.modes[0].key);

  return (
    <section id="ai-workflow" className="relative overflow-x-clip pt-[140px]">
      <Container>
        <Reveal>
          <SectionHeading title={AI_WORKFLOW.title} lede={AI_WORKFLOW.lede} />
        </Reveal>

        {/* tab bar */}
        <Reveal delay={0.08} className="mt-[60px]">
          <div
            role="tablist"
            aria-label={AI_WORKFLOW.title}
            className="mx-auto grid max-w-[840px] grid-cols-2 gap-1 bg-black/40 p-2 sm:flex sm:items-stretch sm:gap-0"
          >
            {AI_WORKFLOW.modes.map((mode, i) => {
              const Icon = MODE_ICONS[mode.icon];
              const isActive = mode.key === active;
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
                    onClick={() => setActive(mode.key)}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 border px-3 py-3 font-sans text-base font-medium transition-colors",
                      isActive
                        ? "border-lime bg-surface-deep text-lime"
                        : "border-transparent text-ink hover:text-lime",
                    )}
                  >
                    <Icon aria-hidden className="size-[18px] shrink-0" />
                    {mode.label}
                  </button>
                </Fragment>
              );
            })}
          </div>
        </Reveal>

        {/* panel */}
        <Reveal delay={0.12} className="mt-8">
          <div className="bg-surface-deep p-6 lg:p-8">
            {AI_WORKFLOW.modes.map((mode) => {
              const Icon = MODE_ICONS[mode.icon];
              return (
                <div
                  key={mode.key}
                  role="tabpanel"
                  id={`ai-workflow-panel-${mode.key}`}
                  aria-labelledby={`ai-workflow-tab-${mode.key}`}
                  className={cn(
                    "gap-10 lg:grid-cols-2 lg:items-center",
                    mode.key === active ? "grid" : "hidden",
                  )}
                >
                  <div
                    aria-hidden
                    className="stripes-lime aspect-square w-full max-w-[560px]"
                  />
                  <div className="max-w-full">
                    <span className="grid size-12 place-items-center rounded-md bg-black/25 text-lime">
                      <Icon aria-hidden className="size-6" />
                    </span>
                    <h3 className="mt-10 max-w-md font-display text-[26px] font-semibold leading-[1.3] text-ink sm:text-[32px]">
                      {mode.heading}
                    </h3>
                    <ul className="mt-6 grid gap-6">
                      {mode.points.map((point) => (
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
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
