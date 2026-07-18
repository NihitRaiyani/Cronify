"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import {
  Languages,
  MapPin,
  Scissors,
  Search,
  ShieldCheck,
  Store,
} from "lucide-react";
import { ScoreMeter } from "@/components/primitives/score-meter";
import { HERO, type ConsoleRowStatus } from "@/content/hero";
import { cn } from "@/lib/utils";

function StatusChip({ status }: { status: ConsoleRowStatus }) {
  const label = HERO.console.statusLabels[status];
  if (status === "ready") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-aqua-400/30 bg-aqua-500/10 px-2.5 py-1 text-[11px] font-medium text-aqua-300">
        <span className="size-1.5 rounded-full bg-aqua-400" />
        {label}
      </span>
    );
  }
  if (status === "generating") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-400/30 bg-brand-500/10 px-2.5 py-1 text-[11px] font-medium text-brand-300">
        <span className="relative h-1 w-6 overflow-hidden rounded-full bg-brand-500/25">
          <span className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-brand-300 motion-safe:animate-pulse" />
        </span>
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-ink-faint">
      {label}
    </span>
  );
}

function FloatingChip({
  className,
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={cn(
        "absolute z-10 flex items-center gap-2.5 rounded-2xl border border-white/[0.1] bg-night-800/95 px-3.5 py-2.5 shadow-[0_16px_48px_-12px_rgba(7,11,22,0.95)] backdrop-blur-xl",
        className,
      )}
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay }}
    >
      {children}
    </m.div>
  );
}

/** The hero's product visual: an original CSS-built operator-console card. */
export function HeroVisual() {
  const c = HERO.console;
  return (
    <div className="relative mx-auto w-full max-w-[540px] lg:translate-x-8 xl:translate-x-14">
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-brand-500/30 via-transparent to-aqua-500/25 blur-3xl"
      />

      <div role="img" aria-label={HERO.ariaConsole}>
        <div
          aria-hidden
          className="overflow-hidden rounded-card border border-white/[0.1] bg-night-800/75 shadow-[0_40px_100px_-32px_rgba(7,11,22,0.95)] backdrop-blur-2xl lg:rotate-[1.5deg]"
        >
          {/* window bar */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/[0.14]" />
              <span className="size-2.5 rounded-full bg-white/[0.14]" />
              <span className="size-2.5 rounded-full bg-white/[0.14]" />
            </div>
            <span className="text-xs font-medium tracking-wide text-ink-faint">
              {c.title}
            </span>
            <span className="ml-auto rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-ink-faint">
              {c.badge}
            </span>
          </div>

          <div className="space-y-4 p-5">
            {/* scan controls */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-night-900/70 px-3 py-2 text-sm text-ink">
                <MapPin className="size-3.5 text-aqua-300" />
                {c.city}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-night-900/70 px-3 py-2 text-sm text-ink">
                <Scissors className="size-3.5 text-brand-300" />
                {c.industry}
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-ink px-3.5 py-2 text-sm font-semibold text-night-900">
                <Search className="size-3.5" />
                Scan
              </span>
            </div>

            <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
              {c.scanNote}
            </p>

            {/* lead rows */}
            <ul className="space-y-2">
              {c.rows.map((row) => (
                <li
                  key={row.label}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border border-white/[0.05] bg-night-900/50 px-3.5 py-3",
                    row.status === "ready" &&
                      "border-aqua-400/20 bg-aqua-500/[0.05]",
                  )}
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/[0.06] bg-night-800 text-ink-dim">
                    <Store className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-[13px] font-medium text-ink">
                        {row.label}
                      </span>
                      <StatusChip status={row.status} />
                    </div>
                    <ScoreMeter score={row.score} />
                  </div>
                </li>
              ))}
            </ul>

            <p className="border-t border-white/[0.06] pt-3 text-[11px] text-ink-faint">
              {c.footer}
            </p>
          </div>
        </div>
      </div>

      <FloatingChip
        className="-left-3 -top-6 sm:-bottom-7 sm:-left-9 sm:top-auto"
        delay={0.4}
      >
        <span className="font-gujarati text-lg leading-none text-aqua-300">
          {HERO.chips.language.gujarati}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-ink-dim">
          <Languages className="size-3.5 text-ink-faint" />
          {HERO.chips.language.label}
        </span>
      </FloatingChip>

      <FloatingChip className="-bottom-6 right-2 sm:right-8" delay={1.6}>
        <ShieldCheck className="size-4 text-aqua-300" />
        <span className="text-xs text-ink-dim">{HERO.chips.firewall}</span>
      </FloatingChip>
    </div>
  );
}
