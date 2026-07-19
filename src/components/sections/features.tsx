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
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AButton } from "@/components/primitives/a-button";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { FEATURES, type FeatureRowKey, type FeatureVisual } from "@/content/features";

const POINT_ICONS: Record<FeatureRowKey, readonly [LucideIcon, LucideIcon, LucideIcon]> = {
  discover: [Map, Link2, Inbox],
  score: [ListChecks, ArrowDownNarrowWide, Crosshair],
  draft: [ShieldCheck, EyeOff, UserCheck],
  handover: [Languages, Type, IndianRupee],
};

/* ---------------------------------------------------------------- mocks --- */

/** Dot-grid map: three pins joined by a lime route. */
function MapMock() {
  return (
    <svg viewBox="0 0 432 250" className="h-auto w-full" aria-hidden="true">
      <defs>
        <pattern id="feat-map-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.6" fill="#E3E6EA" />
        </pattern>
      </defs>
      <rect width="432" height="250" rx="10" fill="url(#feat-map-dots)" />
      <path
        d="M70 190 C 128 168, 148 104, 214 108 C 272 112, 306 118, 356 66"
        fill="none"
        stroke="#9BC53D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="142" cy="140" r="4" fill="#9BC53D" />
      <circle cx="290" cy="114" r="4" fill="#9BC53D" />
      {[
        { x: 70, y: 190 },
        { x: 214, y: 108 },
        { x: 356, y: 66 },
      ].map((p) => (
        <g key={`${p.x}-${p.y}`} transform={`translate(${p.x} ${p.y})`}>
          <path
            d="M0 0 C -8 -11 -13 -17 -13 -25 a13 13 0 1 1 26 0 C 13 -17 8 -11 0 0 Z"
            fill="#0F7B4B"
          />
          <circle cx="0" cy="-25" r="4.5" fill="#FFFFFF" />
        </g>
      ))}
      <rect x="96" y="176" width="64" height="22" rx="11" fill="#F3F4F6" stroke="#E5E7EB" />
      <rect x="108" y="185" width="40" height="4" rx="2" fill="#C6CBD2" />
      <rect x="238" y="94" width="64" height="22" rx="11" fill="#F3F4F6" stroke="#E5E7EB" />
      <rect x="250" y="103" width="40" height="4" rx="2" fill="#C6CBD2" />
    </svg>
  );
}

/** 0-100 arc gauge with needle, plus three small signal bars. */
function ScoreMock() {
  return (
    <svg viewBox="0 0 432 250" className="h-auto w-full" aria-hidden="true">
      <path
        d="M121 150 A 95 95 0 0 1 311 150"
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M121 150 A 95 95 0 0 1 170 67"
        fill="none"
        stroke="#9BC53D"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <line x1="216" y1="150" x2="183" y2="89" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      <circle cx="216" cy="150" r="6" fill="#1F2937" />
      <text x="112" y="176" fontSize="12" fill="#9CA3AF" fontFamily="Inter, sans-serif">
        0
      </text>
      <text x="300" y="176" fontSize="12" fill="#9CA3AF" fontFamily="Inter, sans-serif">
        100
      </text>
      <text
        x="216"
        y="196"
        fontSize="28"
        fontWeight="600"
        fill="#111827"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
      >
        34
      </text>
      <rect x="168" y="222" width="16" height="16" rx="3" fill="#E5E7EB" />
      <rect x="192" y="212" width="16" height="26" rx="3" fill="#CDE8A9" />
      <rect x="216" y="204" width="16" height="34" rx="3" fill="#9BC53D" />
      <rect x="240" y="216" width="16" height="22" rx="3" fill="#CDE8A9" />
    </svg>
  );
}

/** Mini webpage wireframe: title bar, two filled blocks, one dashed block. */
function DraftMock() {
  return (
    <div className="overflow-hidden rounded-lg border border-[#E5E7EB]" aria-hidden="true">
      <div className="flex h-8 items-center gap-1.5 border-b border-[#E5E7EB] bg-[#F7F8F9] px-3">
        <span className="size-2 rounded-full bg-[#D6DAE0]" />
        <span className="size-2 rounded-full bg-[#D6DAE0]" />
        <span className="size-2 rounded-full bg-[#9BC53D]" />
        <span className="ml-3 h-2 w-28 rounded-full bg-[#E5E7EB]" />
      </div>
      <div className="space-y-3 p-4">
        <div className="rounded-md bg-[#F3F4F6] p-3">
          <div className="h-2.5 w-2/5 rounded-full bg-[#9BC53D]" />
          <div className="mt-2 h-2 w-11/12 rounded-full bg-[#D6DAE0]" />
          <div className="mt-1.5 h-2 w-3/4 rounded-full bg-[#D6DAE0]" />
        </div>
        <div className="rounded-md bg-[#F3F4F6] p-3">
          <div className="h-2 w-5/6 rounded-full bg-[#D6DAE0]" />
          <div className="mt-1.5 h-2 w-2/3 rounded-full bg-[#D6DAE0]" />
        </div>
        <div className="grid min-h-16 place-items-center rounded-md border-2 border-dashed border-[#CBD2DA] p-3">
          <span className="text-xs text-[#9CA3AF]">hidden until known</span>
        </div>
      </div>
    </div>
  );
}

const QR_CELLS = [
  1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1,
] as const;

/** Two chat bubbles, a QR-like grid, and an indicative-price chip. */
function HandoverMock() {
  return (
    <div aria-hidden="true">
      <div className="w-fit max-w-[70%] rounded-xl rounded-bl-sm bg-[#F3F4F6] px-4 py-2.5">
        <span className="font-gujarati text-sm text-[#374151]">નમસ્તે</span>
      </div>
      <div className="ml-auto mt-3 w-fit max-w-[70%] rounded-xl rounded-br-sm bg-[#E7F4C8] px-4 py-3">
        <div className="h-2 w-32 rounded-full bg-[#AFCB7B]" />
        <div className="mt-1.5 h-2 w-20 rounded-full bg-[#AFCB7B]" />
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
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
      <Container>
        <Reveal>
          <SectionHeading title={FEATURES.title} lede={FEATURES.lede} />
        </Reveal>
        <Stagger className="mt-[60px] divide-y divide-black/20">
          {FEATURES.rows.map((row) => {
            const Mock = MOCKS[row.visual];
            return (
              <StaggerItem key={row.key}>
                <div className="grid bg-surface-deep lg:min-h-[473px] lg:grid-cols-2">
                  <div className="flex flex-col items-start justify-center p-10 lg:p-14">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-lime">
                      {row.layers}
                    </p>
                    <h3 className="mt-3 font-display text-[32px] font-semibold leading-[1.3] text-ink">
                      {row.title}
                    </h3>
                    <p className="mt-3 max-w-md text-base leading-6 text-white/85">
                      {row.body}
                    </p>
                    <ul className="mt-8 flex flex-col gap-6">
                      {row.points.map((point, i) => {
                        const Icon = POINT_ICONS[row.key][i] ?? Map;
                        return (
                          <li key={point} className="flex items-center gap-5">
                            <span className="grid size-11 shrink-0 place-items-center rounded-md bg-black/25">
                              <Icon className="size-5 text-lime" strokeWidth={1.8} />
                            </span>
                            <span className="max-w-md text-base leading-6 text-ink">
                              {point}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    <AButton href={FEATURES.cta.href} className="mt-10 w-fit">
                      {FEATURES.cta.label}
                    </AButton>
                  </div>
                  <div className="stripes-lime flex items-center justify-center p-10 lg:p-12">
                    <div className="w-full max-w-[480px] rounded-xl bg-white p-6 shadow-[0_24px_48px_rgba(0,32,16,0.18)]">
                      <Mock />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
