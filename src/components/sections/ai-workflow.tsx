import {
  Braces,
  Combine,
  Database,
  FileSearch,
  ShieldBan,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Aurora } from "@/components/primitives/aurora";
import { Container } from "@/components/primitives/container";
import { GlassCard } from "@/components/primitives/glass-card";
import { SectionHeading, Serif } from "@/components/primitives/section-heading";
import { AI_WORKFLOW } from "@/content/ai-workflow";

const NODE_ICONS: LucideIcon[] = [Database, FileSearch, Braces, Combine];

export function AiWorkflow() {
  return (
    <section className="relative overflow-x-clip bg-night-950 py-24 lg:py-32">
      <Aurora dim grid={false} />
      <Container className="relative">
        <SectionHeading
          eyebrow={AI_WORKFLOW.eyebrow}
          eyebrowGujarati={AI_WORKFLOW.eyebrowGujarati}
          title={
            <>
              {AI_WORKFLOW.titleStart} <Serif>{AI_WORKFLOW.titleAccent}</Serif>
            </>
          }
          lede={AI_WORKFLOW.lede}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* pipeline */}
          <Stagger className="grid content-center gap-3 sm:grid-cols-2">
            {AI_WORKFLOW.pipeline.map((node, i) => {
              const Icon = NODE_ICONS[i];
              return (
                <StaggerItem key={node.key} className="relative">
                  <GlassCard className="flex h-full items-center gap-4 bg-night-800/50 p-5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-gradient-to-br from-brand-500/[0.22] to-aqua-500/[0.14] text-aqua-300">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="flex items-center gap-2">
                        <span className="font-display text-[11px] font-semibold text-gradient-brand">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
                          {node.label}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[13px] text-ink-faint">
                        {node.sub}
                      </span>
                    </span>
                  </GlassCard>
                  {i < AI_WORKFLOW.pipeline.length - 1 ? (
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="absolute -right-[18px] top-1/2 z-10 hidden w-4 -translate-y-1/2 text-ink-faint sm:block [&:nth-child(3)]:rotate-90"
                    >
                      <path
                        d="M2 12 H16 M12 7 l6 5 -6 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                        className="animate-dash"
                      />
                    </svg>
                  ) : null}
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* the firewall panel */}
          <Reveal delay={0.1}>
            <GlassCard className="flex h-full flex-col gap-5 border-spark-500/[0.14] bg-night-800/50 p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-spark-400/25 bg-spark-500/10 text-spark-300">
                  <ShieldBan className="size-5" />
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {AI_WORKFLOW.neverTitle}
                </h3>
              </div>
              <ul className="space-y-3">
                {AI_WORKFLOW.nevers.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-ink-dim">
                    <span
                      aria-hidden
                      className="mt-[7px] size-1.5 shrink-0 rounded-full bg-spark-400/80"
                    />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-auto space-y-2.5 border-t border-white/[0.06] pt-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                  {AI_WORKFLOW.redactedIntro}
                </p>
                <div className="flex flex-wrap gap-2">
                  {AI_WORKFLOW.redacted.map((word) => (
                    <span
                      key={word}
                      className="rounded-full border border-white/[0.08] bg-night-900/70 px-3 py-1 text-xs text-ink-faint line-through decoration-spark-400/70 decoration-2"
                    >
                      {word}
                    </span>
                  ))}
                </div>
                <p className="pt-1 text-[13px] italic text-ink-dim">
                  {AI_WORKFLOW.selfNote}
                </p>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
