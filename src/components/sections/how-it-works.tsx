import {
  BookOpen,
  Gauge,
  MessagesSquare,
  PenLine,
  QrCode,
  Search,
  Sprout,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AButton } from "@/components/primitives/a-button";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { HOW_IT_WORKS, type LayerKey } from "@/content/how-it-works";
import { cn } from "@/lib/utils";

const ICONS: Record<LayerKey, LucideIcon> = {
  discover: Search,
  understand: BookOpen,
  score: Gauge,
  draft: PenLine,
  review: UserCheck,
  share: QrCode,
  converse: MessagesSquare,
  grow: Sprout,
};

/** The 8 journey stops, bottom-left → top-right, on a 540×960 canvas. */
const STOPS: ReadonlyArray<readonly [number, number]> = [
  [64, 830],
  [200, 742],
  [120, 640],
  [280, 552],
  [176, 448],
  [340, 356],
  [250, 250],
  [456, 150],
];

/** Catmull-Rom smoothed path through STOPS (precomputed). */
const JOURNEY_PATH =
  "M 64 830 C 87 815, 191 774, 200 742 C 209 710, 107 672, 120 640 " +
  "C 133 608, 271 584, 280 552 C 289 520, 166 481, 176 448 " +
  "C 186 415, 328 389, 340 356 C 352 323, 231 284, 250 250 " +
  "C 269 216, 422 167, 456 150";

const CONTOURS = [
  "M -20 120 C 110 90, 250 156, 380 124 S 540 100, 580 132",
  "M -20 268 C 140 236, 260 304, 410 270 S 550 246, 580 280",
  "M -20 420 C 120 386, 280 456, 420 420 S 552 396, 580 432",
  "M -20 572 C 130 540, 270 608, 410 572 S 548 548, 580 584",
  "M -20 724 C 140 692, 260 758, 400 724 S 550 700, 580 736",
  "M -20 876 C 120 844, 270 910, 410 876 S 548 852, 580 888",
];

/** Decorative journey line: faint contours behind a winding lime path with
 *  numbered stop circles 01–08. Pure SVG, no animation. */
function JourneyLine() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 540 960"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {CONTOURS.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
      ))}
      <path
        d={JOURNEY_PATH}
        fill="none"
        stroke="#CEF47B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {STOPS.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <circle
            cx={x}
            cy={y}
            r="12"
            fill="#002010"
            stroke="#CEF47B"
            strokeWidth="1"
          />
          <text
            x={x}
            y={y + 0.5}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#CEF47B"
            fontSize="10"
            fontWeight="500"
          >
            {String(i + 1).padStart(2, "0")}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-x-clip pt-[140px] scroll-mt-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={HOW_IT_WORKS.eyebrow}
            eyebrowGujarati={HOW_IT_WORKS.eyebrowGujarati}
            title={HOW_IT_WORKS.title}
            lede={HOW_IT_WORKS.lede}
          />
        </Reveal>

        <div className="mt-[60px] grid border border-edge lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: deep-green journey panel */}
          <Reveal className="relative min-h-[520px] bg-surface-deep p-8 lg:min-h-[640px]">
            <h3 className="relative z-10 whitespace-pre-line font-display text-2xl font-medium leading-snug text-ink">
              {HOW_IT_WORKS.panel.heading}
            </h3>
            <JourneyLine />
            <AButton
              href={HOW_IT_WORKS.panel.cta.href}
              className="absolute bottom-8 left-8 z-10"
            >
              {HOW_IT_WORKS.panel.cta.label}
            </AButton>
          </Reveal>

          {/* Right: 8 layer cells with hairline dividers */}
          <Stagger className="grid grid-cols-1 border-t border-edge sm:grid-cols-2 lg:border-l lg:border-t-0">
            {HOW_IT_WORKS.layers.map((layer, i) => {
              const Icon = ICONS[layer.key];
              return (
                <StaggerItem
                  key={layer.key}
                  className={cn(
                    "border-edge p-6 lg:p-8",
                    i > 0 && "border-t",
                    i < 2 && "sm:border-t-0",
                    i % 2 === 1 && "sm:border-l",
                  )}
                >
                  <span className="grid size-10 place-items-center rounded-md bg-tile">
                    <Icon className="size-5 text-[#0C2A10]" strokeWidth={2} />
                  </span>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                    Layer {layer.number}
                  </p>
                  <h3 className="mt-1 font-display text-[22px] font-medium leading-snug text-ink">
                    {layer.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                    {layer.body}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
