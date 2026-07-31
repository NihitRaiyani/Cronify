"use client";

import { m } from "framer-motion";
import {
  ArrowDownNarrowWide,
  Crosshair,
  EyeOff,
  IndianRupee,
  Inbox,
  Languages,
  Link2,
  ListChecks,
  Map,
  ShieldCheck,
  Type,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

import { AButton } from "@/components/primitives/a-button";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { FEATURES, type FeatureRowKey, type FeatureVisual } from "@/content/features";
import { SectionDivider } from "../primitives/section-divider";

const POINT_ICONS: Record<FeatureRowKey, readonly [LucideIcon, LucideIcon, LucideIcon]> = {
  discover: [Map, Link2, Inbox],
  score: [ListChecks, ArrowDownNarrowWide, Crosshair],
  draft: [ShieldCheck, EyeOff, UserCheck],
  handover: [Languages, Type, IndianRupee],
};

/* ---------------------------------------------------------------- animation variants --- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

const visualVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom snappy ease-out
    },
  },
};

/* ---------------------------------------------------------------- mocks --- */
/* Ref parity: each visual is a dense, believable product surface (toolbars,
   result rails, chips, badges) — not minimal line art. All decorative. */

function MapMock() {
  return (
    <svg viewBox="0 0 432 250" className="h-auto w-full" aria-hidden="true">
      <defs>
        <pattern id="feat-map-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.6" fill="#E3E6EA" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="432" height="30" rx="8" fill="#F7F8F9" />
      <rect x="8" y="7" width="150" height="16" rx="8" fill="#FFFFFF" stroke="#E5E7EB" />
      <circle cx="18" cy="15" r="4" fill="none" stroke="#9CA3AF" strokeWidth="1.5" />
      <line x1="21" y1="18" x2="24" y2="21" stroke="#9CA3AF" strokeWidth="1.5" />
      <rect x="30" y="12" width="70" height="5" rx="2.5" fill="#D6DAE0" />
      <rect x="166" y="7" width="56" height="16" rx="8" fill="#E7F4C8" />
      <rect x="174" y="12" width="40" height="5" rx="2.5" fill="#5B7A2A" />
      <rect x="228" y="7" width="56" height="16" rx="8" fill="#FFFFFF" stroke="#E5E7EB" />
      <rect x="236" y="12" width="40" height="5" rx="2.5" fill="#C6CBD2" />
      <rect x="366" y="7" width="58" height="16" rx="8" fill="#0F7B4B" />
      <text x="395" y="18.5" fontSize="10" fontWeight="600" fill="#FFFFFF" textAnchor="middle" fontFamily="Inter, sans-serif">
        38 found
      </text>
      {[
        { y: 40, score: "18", chip: "#0F7B4B", text: "#FFFFFF" },
        { y: 84, score: "27", chip: "#CDE8A9", text: "#3C5220" },
        { y: 128, score: "34", chip: "#EEF0F3", text: "#4B5563" },
      ].map((r) => (
        <g key={r.y}>
          <rect x="0" y={r.y} width="150" height="38" rx="8" fill="#FFFFFF" stroke="#E5E7EB" />
          <circle cx="18" cy={r.y + 19} r="8" fill="#F3F4F6" />
          <rect x="32" y={r.y + 10} width="66" height="5" rx="2.5" fill="#6B7280" />
          <rect x="32" y={r.y + 21} width="44" height="4" rx="2" fill="#C6CBD2" />
          <rect x="108" y={r.y + 10} width="34" height="18" rx="9" fill={r.chip} />
          <text x="125" y={r.y + 23} fontSize="10" fontWeight="600" fill={r.text} textAnchor="middle" fontFamily="Inter, sans-serif">
            {r.score}
          </text>
        </g>
      ))}
      <rect x="0" y="172" width="150" height="10" rx="5" fill="#F3F4F6" />
      <rect x="158" y="38" width="274" height="212" rx="10" fill="url(#feat-map-dots)" />
      <path d="M190 220 C 240 196, 258 132, 310 134 C 352 136, 372 130, 408 84" fill="none" stroke="#9BC53D" strokeWidth="3" strokeLinecap="round" />
      <circle cx="262" cy="158" r="4" fill="#9BC53D" />
      <circle cx="352" cy="132" r="4" fill="#9BC53D" />
      {[
        { x: 190, y: 220 },
        { x: 310, y: 134 },
        { x: 408, y: 84 },
      ].map((p) => (
        <g key={`${p.x}-${p.y}`} transform={`translate(${p.x} ${p.y})`}>
          <path d="M0 0 C -8 -11 -13 -17 -13 -25 a13 13 0 1 1 26 0 C 13 -17 8 -11 0 0 Z" fill="#0F7B4B" />
          <circle cx="0" cy="-25" r="4.5" fill="#FFFFFF" />
        </g>
      ))}
      <rect x="212" y="206" width="64" height="20" rx="10" fill="#F3F4F6" stroke="#E5E7EB" />
      <rect x="224" y="214" width="40" height="4" rx="2" fill="#C6CBD2" />
      <rect x="330" y="114" width="64" height="20" rx="10" fill="#F3F4F6" stroke="#E5E7EB" />
      <rect x="342" y="122" width="40" height="4" rx="2" fill="#C6CBD2" />
    </svg>
  );
}

function ScoreMock() {
  const SIGNALS: ReadonlyArray<{ ok: boolean; w: number }> = [
    { ok: false, w: 92 },
    { ok: false, w: 70 },
    { ok: true, w: 84 },
    { ok: false, w: 60 },
    { ok: true, w: 96 },
    { ok: true, w: 74 },
    { ok: true, w: 88 },
  ];
  return (
    <svg viewBox="0 0 432 250" className="h-auto w-full" aria-hidden="true">
      <circle cx="16" cy="16" r="10" fill="#F3F4F6" />
      <rect x="34" y="8" width="90" height="6" rx="3" fill="#6B7280" />
      <rect x="34" y="20" width="58" height="5" rx="2.5" fill="#C6CBD2" />
      <rect x="330" y="6" width="94" height="20" rx="10" fill="#FBE9E9" />
      <text x="377" y="20" fontSize="10" fontWeight="600" fill="#B4483C" textAnchor="middle" fontFamily="Inter, sans-serif">
        below 40
      </text>
      <path d="M52 176 A 88 88 0 0 1 228 176" fill="none" stroke="#E5E7EB" strokeWidth="14" strokeLinecap="round" />
      <path d="M52 176 A 88 88 0 0 1 97 100" fill="none" stroke="#9BC53D" strokeWidth="14" strokeLinecap="round" />
      <line x1="140" y1="176" x2="110" y2="118" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      <circle cx="140" cy="176" r="6" fill="#1F2937" />
      <text x="46" y="200" fontSize="11" fill="#9CA3AF" fontFamily="Inter, sans-serif">0</text>
      <text x="216" y="200" fontSize="11" fill="#9CA3AF" fontFamily="Inter, sans-serif">100</text>
      <text x="140" y="218" fontSize="28" fontWeight="600" fill="#111827" textAnchor="middle" fontFamily="Inter, sans-serif">
        34
      </text>
      <rect x="92" y="228" width="96" height="16" rx="8" fill="#F3F4F6" />
      <rect x="104" y="234" width="72" height="4" rx="2" fill="#C6CBD2" />
      <rect x="262" y="42" width="80" height="5" rx="2.5" fill="#9CA3AF" />
      {SIGNALS.map((s, i) => (
        <g key={i} transform={`translate(262 ${60 + i * 26})`}>
          <circle cx="7" cy="7" r="7" fill={s.ok ? "#CDE8A9" : "#FBE9E9"} />
          {s.ok ? (
            <path d="M3.5 7.5 L6 10 L10.5 4.5" fill="none" stroke="#3C5220" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <path d="M4.5 4.5 L9.5 9.5 M9.5 4.5 L4.5 9.5" stroke="#B4483C" strokeWidth="1.8" strokeLinecap="round" />
          )}
          <rect x="22" y="4" width={s.w} height="6" rx="3" fill={s.ok ? "#D6DAE0" : "#EDCFCB"} />
        </g>
      ))}
    </svg>
  );
}

function DraftMock() {
  return (
    <div className="overflow-hidden rounded-lg border border-[#E5E7EB]" aria-hidden="true">
      <div className="flex h-8 items-center gap-1.5 border-b border-[#E5E7EB] bg-[#F7F8F9] px-3">
        <span className="size-2 rounded-full bg-[#D6DAE0]" />
        <span className="size-2 rounded-full bg-[#D6DAE0]" />
        <span className="size-2 rounded-full bg-[#9BC53D]" />
        <span className="ml-3 h-2 w-28 rounded-full bg-[#E5E7EB]" />
        <span className="ml-auto rounded-full bg-white px-2 py-0.5 font-gujarati text-[9px] text-[#6B7280]">
          ગુ / EN
        </span>
      </div>
      <div className="space-y-2.5 p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="size-4 rounded-full bg-[#0F7B4B]" />
            <span className="h-2.5 w-20 rounded-full bg-[#6B7280]" />
          </span>
          <span className="flex gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-[#D6DAE0]" />
            <span className="h-1.5 w-6 rounded-full bg-[#D6DAE0]" />
            <span className="h-1.5 w-6 rounded-full bg-[#D6DAE0]" />
          </span>
        </div>
        <div className="rounded-md bg-[#F3F4F6] p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="h-2.5 w-2/5 rounded-full bg-[#9BC53D]" />
              <div className="mt-2 h-2 w-11/12 rounded-full bg-[#D6DAE0]" />
              <div className="mt-1.5 h-2 w-3/4 rounded-full bg-[#D6DAE0]" />
            </div>
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#E7F4C8] px-2 py-0.5 text-[9px] font-medium text-[#3C5220]">
              ✓ grounded
            </span>
          </div>
          <span className="mt-2.5 inline-block rounded-sm bg-[#0F7B4B] px-2.5 py-1">
            <span className="block h-1.5 w-12 rounded-full bg-white/80" />
          </span>
        </div>
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-md border border-[#EDEFF2] bg-[#FAFBFC] p-2.5">
            <span className="size-8 shrink-0 rounded-md bg-[#E5E7EB]" />
            <div className="min-w-0 flex-1">
              <div className="h-2 w-1/2 rounded-full bg-[#6B7280]" />
              <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-[#D6DAE0]" />
            </div>
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#CDE8A9] text-[8px] text-[#3C5220]">
              ✓
            </span>
          </div>
        ))}
        <div className="grid min-h-12 place-items-center rounded-md border-2 border-dashed border-[#CBD2DA] p-2">
          <span className="text-xs text-[#9CA3AF]">hidden until known</span>
        </div>
      </div>
    </div>
  );
}

const QR_CELLS = [
  1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1,
] as const;

function HandoverMock() {
  return (
    <div aria-hidden="true">
      <div className="flex items-center gap-2.5 border-b border-[#EDEFF2] pb-3">
        <span className="relative size-8 rounded-full bg-[#F3F4F6]">
          <span className="absolute bottom-0 right-0 size-2 rounded-full border border-white bg-[#9BC53D]" />
        </span>
        <div>
          <div className="h-2.5 w-24 rounded-full bg-[#6B7280]" />
          <div className="mt-1.5 h-1.5 w-14 rounded-full bg-[#CDE8A9]" />
        </div>
        <span className="ml-auto rounded-full border border-[#E5E7EB] px-2 py-0.5 text-[9px] text-[#9CA3AF]">
          9:04 pm
        </span>
      </div>
      <div className="mt-3 w-fit max-w-[70%] rounded-xl rounded-bl-sm bg-[#F3F4F6] px-4 py-2.5">
        <span className="font-gujarati text-sm text-[#374151]">નમસ્તે</span>
        <div className="mt-1.5 h-1.5 w-24 rounded-full bg-[#D6DAE0]" />
      </div>
      <div className="ml-auto mt-2.5 w-fit max-w-[75%] rounded-xl rounded-br-sm bg-[#E7F4C8] px-4 py-3">
        <div className="h-2 w-36 rounded-full bg-[#AFCB7B]" />
        <div className="mt-1.5 h-2 w-24 rounded-full bg-[#AFCB7B]" />
        <span className="mt-2 flex w-fit items-center gap-1 rounded-full bg-white/70 px-2 py-0.5 text-[9px] font-medium text-[#3C5220]">
          draft · tap to approve
        </span>
      </div>
      <div className="mt-2.5 w-fit max-w-[55%] rounded-xl rounded-bl-sm bg-[#F3F4F6] px-4 py-2">
        <div className="h-1.5 w-16 rounded-full bg-[#D6DAE0]" />
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="grid w-fit grid-cols-5 gap-[3px] rounded-md border border-[#E5E7EB] p-2">
          {QR_CELLS.map((on, i) => (
            <span
              key={i}
              className={`size-2.5 rounded-[2px] ${on ? "bg-[#1F2937]" : "bg-[#EEF0F3]"}`}
            />
          ))}
        </div>
        <span className="rounded-full border border-[#D6DAE0] bg-[#F9FAFB] px-3 py-1.5 text-xs text-[#4B5563]">
          ₹ range · indicative
        </span>
      </div>
    </div>
  );
}

const MOCKS: Record<FeatureVisual, () => React.ReactNode> = {
  map: MapMock,
  score: ScoreMock,
  draft: DraftMock,
  handover: HandoverMock,
};

/* -------------------------------------------------------------- section --- */

export function Features() {
  return (
    <section id="features" className="relative overflow-x-clip pt-[140px]">
      <Container className="max-w-[1342px]">
        <SectionHeading title={FEATURES.title} lede={FEATURES.lede} />

        <div className="mt-[60px] divide-y divide-black/20">
          <SectionDivider />
          {FEATURES.rows.map((row) => {
            const Mock = MOCKS[row.visual];
            return (
              <div
                key={row.key}
                className="grid bg-surface-deep lg:min-h-[473px] lg:grid-cols-2 sticky top-[100px]"
              >
                {/* 1. Staggered Text Column */}
                <m.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-15%" }}
                  variants={containerVariants}
                  className="flex flex-col items-start justify-center p-10 lg:p-14"
                >
                  <m.p variants={fadeUpVariants as any} className="text-xs font-medium uppercase tracking-[0.18em] text-lime">
                    {row.layers}
                  </m.p>
                  <m.h3 variants={fadeUpVariants as any} className="mt-3 font-display text-[32px] font-semibold leading-[1.3] text-ink">
                    {row.title}
                  </m.h3>
                  <m.p variants={fadeUpVariants as any} className="mt-3 max-w-md text-base leading-6 text-white/85">
                    {row.body}
                  </m.p>

                  <ul className="mt-8 flex flex-col gap-6">
                    {row.points.map((point, i) => {
                      const Icon = POINT_ICONS[row.key][i] ?? Map;
                      return (
                        <m.li variants={fadeUpVariants as any} key={point} className="flex items-center gap-5">
                          <span className="grid size-11 shrink-0 place-items-center rounded-md bg-black/25">
                            <Icon className="size-5 text-lime" strokeWidth={1.8} />
                          </span>
                          <span className="max-w-md text-base leading-6 text-ink">
                            {point}
                          </span>
                        </m.li>
                      );
                    })}
                  </ul>

                  <m.div variants={fadeUpVariants as any} className="mt-10 w-fit">
                    <AButton href={FEATURES.cta.href}>
                      {FEATURES.cta.label}
                    </AButton>
                  </m.div>
                </m.div>

                {/* 2. Visual Column with slight hover interaction */}
                <div className="stripes-lime flex items-center justify-center p-10 lg:p-12">
                  <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-15%" }}
                    variants={visualVariants as any}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02, 
                      boxShadow: "0 32px 64px rgba(0,32,16,0.25)" 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="w-full max-w-[480px] rounded-xl bg-white p-6 shadow-[0_24px_48px_rgba(0,32,16,0.18)] cursor-pointer"
                  >
                    <Mock />
                  </m.div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}