"use client";

import { useEffect, useRef } from "react";
import { m } from "framer-motion";
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

import { ScrubScale } from "@/components/motion/scrub-scale";
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

/* ---------------------------------------------------------------- animation variants --- */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Stagger items gracefully
      delayChildren: 0.1,
    },
  },
};

const fadeUpBlurVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 24,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

/* ---------------------------------------------------------------- journey paths --- */
const STOPS: ReadonlyArray<readonly [number, number]> = [
  [64, 830], [200, 742], [120, 640], [280, 552],
  [176, 448], [340, 356], [250, 250], [456, 150],
];

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

function JourneyLine() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 540 960"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {CONTOURS.map((d) => (
        <path key={d} d={d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      <path d={JOURNEY_PATH} fill="none" stroke="#CEF47B" strokeWidth="1.5" strokeLinecap="round" />
      {STOPS.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="12" fill="#002010" stroke="#CEF47B" strokeWidth="1" />
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative overflow-x-clip pt-[140px] scroll-mt-24"
    >
      <Container>
        <SectionHeading
          eyebrow={HOW_IT_WORKS.eyebrow}
          eyebrowGujarati={HOW_IT_WORKS.eyebrowGujarati}
          title={HOW_IT_WORKS.title}
          lede={HOW_IT_WORKS.lede}
        />

        <div className="mt-[60px] grid border border-edge lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: photographic journey panel */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
            className="relative min-h-[520px] overflow-hidden bg-surface-deep lg:min-h-[640px]"
          >
            <ScrubScale className="absolute inset-0">
              <video
                ref={videoRef}
                muted
                autoPlay
                loop
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/AI_chip_sends_green_light_202607281537.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div aria-hidden className="absolute inset-0 bg-[#002010]/60 mix-blend-multiply" />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#001a0d]/85 via-transparent to-[#001a0d]/45"
              />
            </ScrubScale>

            <m.h3
              variants={fadeUpBlurVariants as any}
              className="relative z-10 whitespace-pre-line p-8 font-display text-2xl font-medium leading-snug text-ink"
            >
              {HOW_IT_WORKS.panel.heading}
            </m.h3>

            {/* <JourneyLine /> */}

            <m.div variants={fadeUpBlurVariants as any} className="absolute bottom-8 left-8 z-10">
              <AButton href={HOW_IT_WORKS.panel.cta.href}>
                {HOW_IT_WORKS.panel.cta.label}
              </AButton>
            </m.div>
          </m.div>

          {/* Right: 8 layer cells */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
            className="grid grid-cols-1 border-t border-edge sm:grid-cols-2 lg:border-l lg:border-t-0"
          >
            {HOW_IT_WORKS.layers.map((layer, i) => {
              const Icon = ICONS[layer.key];
              return (
                <m.div
                  key={layer.key}
                  variants={fadeUpBlurVariants as any}
                  // Interactive group hover applied to the card to trigger the icon
                  whileHover="hover" 
                  className={cn(
                    "group flex flex-col border-edge p-7 transition-colors duration-500 hover:bg-white/[0.02] lg:p-10",
                    i > 0 && "border-t",
                    i < 2 && "sm:border-t-0",
                    i % 2 === 1 && "sm:border-l"
                  )}
                >
                  <m.span
                    variants={{
                      hover: { scale: 1.1, rotate: -3 },
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="grid size-10 place-items-center rounded-md bg-tile"
                  >
                    <Icon className="size-5 text-[#0C2A10] transition-colors" strokeWidth={2} />
                  </m.span>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                    Layer {layer.number}
                  </p>
                  <h3 className="mt-1 font-display text-[22px] font-medium leading-snug text-ink">
                    {layer.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                    {layer.body}
                  </p>
                </m.div>
              );
            })}
          </m.div>
        </div>
      </Container>
    </section>
  );
}