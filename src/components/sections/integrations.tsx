"use client";

import {
  Camera,
  Clock,
  Gauge,
  Link2,
  MapPin,
  MessagesSquare,
  QrCode,
  Star,
  type LucideIcon,
} from "lucide-react";
import { m } from "framer-motion"; // Changed 'motion' to 'm'
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { WordReveal } from "@/components/motion/word-reveal";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { INTEGRATIONS, type IntegrationTileKey } from "@/content/integrations";

const ICONS: Record<IntegrationTileKey, LucideIcon> = {
  maps: MapPin,
  reviews: Star,
  photos: Camera,
  hours: Clock,
  qr: QrCode,
  chat: MessagesSquare,
  score: Gauge,
  demo: Link2,
};

/**
 * Node-web geometry on a 640×640 canvas, hub at (320,320).
 * Tiles 0–3 sit on the outer orbit (r=260, cardinal points);
 * tiles 4–7 on the inner orbit (r=160, diagonals; 160/√2 ≈ 113).
 */
const NODE_POS: ReadonlyArray<readonly [number, number]> = [
  [320, 60], // maps — outer top
  [580, 320], // reviews — outer right
  [320, 580], // photos — outer bottom
  [60, 320], // hours — outer left
  [433, 207], // qr — inner NE
  [433, 433], // chat — inner SE
  [207, 433], // score — inner SW
  [207, 207], // demo — inner NW
];

function Hub({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <div className="relative z-10 flex items-center justify-center">
      {/* Outer Pulse Glow */}
      {/* <m.div // Changed to m.div
        className="absolute rounded-full bg-lime/20"
        initial={{ width: "100%", height: "100%", opacity: 0.8 }}
        animate={{ width: "180%", height: "180%", opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      /> */}
      
      {/* Core Hub */}
      <div
        className={
          size === "lg"
            ? "relative z-10 grid size-36 place-items-center rounded-full bg-lime shadow-[0_0_40px_rgba(132,204,22,0.4)]"
            : "relative z-10 grid size-24 place-items-center rounded-full bg-lime shadow-[0_0_20px_rgba(132,204,22,0.4)]"
        }
      >
        <span
          className={
            size === "lg"
              ? "font-serif text-[27px] lowercase tracking-tight text-ink-inverse"
              : "font-serif text-[20px] lowercase tracking-tight text-ink-inverse"
          }
        >
          {INTEGRATIONS.hub}
          <span className="opacity-70">.</span>
        </span>
      </div>
    </div>
  );
}

function Tile({
  tileKey,
  label,
}: {
  tileKey: IntegrationTileKey;
  label: string;
}) {
  const Icon = ICONS[tileKey];
  return (
    <>
      <span className="relative grid size-14 place-items-center rounded-lg border border-[#1e3b2c] bg-gradient-to-b from-[#0d2419] to-[#04150d] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-6px_12px_rgba(0,0,0,0.45),0_10px_24px_rgba(0,0,0,0.5)] transition-colors hover:border-lime/50">
        <Icon aria-hidden className="size-6 text-lime drop-shadow-[0_0_8px_rgba(132,204,22,0.8)]" strokeWidth={1.75} />
      </span>
      <span className="text-center text-[13px] leading-tight text-ink-muted">
        {label}
      </span>
    </>
  );
}

export function Integrations() {
  return (
    <section
      id="integrations"
      className="relative overflow-x-clip pt-[140px]"
    >
      <Container>
        <SectionHeading
          eyebrow={INTEGRATIONS.eyebrow}
          eyebrowGujarati={INTEGRATIONS.eyebrowGujarati}
          title={
            <>
              <WordReveal text={INTEGRATIONS.titleLines[0]} />
              <br />
              <WordReveal text={INTEGRATIONS.titleLines[1]} />
            </>
          }
          lede={INTEGRATIONS.lede}
        />

        {/* Desktop: High-End Radial Node Web */}
        <div className="relative mt-[60px] hidden lg:block">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-24 inset-y-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 80px), repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 80px)",
              maskImage:
                "radial-gradient(75% 75% at 50% 50%, black 55%, transparent 100%)",
            }}
          />

          <div className="relative mx-auto aspect-square w-full max-w-[640px]">
            <div className="absolute inset-0">
              <svg
                aria-hidden="true"
                viewBox="0 0 640 640"
                className="pointer-events-none h-full w-full"
              >
                {/* Defs for Neon Glow Filters */}
                <defs>
                  <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Counter-Rotating Concentric Orbit Hairlines */}
                <m.circle // Changed to m.circle
                  cx="320"
                  cy="320"
                  r="160"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  style={{ originX: "50%", originY: "50%" }}
                />
                <m.circle // Changed to m.circle
                  cx="320"
                  cy="320"
                  r="260"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                  style={{ originX: "50%", originY: "50%" }}
                />

                {/* Animated Spokes & Energy Rays */}
                {NODE_POS.map(([x, y], i) => {
                  const delay = i * 0.15;
                  const rayDuration = 2 + (i % 3) * 0.5;

                  return (
                    <g key={`spoke-${x}-${y}`}>
                      {/* Base Path: Draws out smoothly on mount */}
                      <m.path // Changed to m.path
                        d={`M 320 320 L ${x} ${y}`}
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, delay, ease: "easeInOut" }}
                      />

                      {/* Energy Rays: Shoots outward infinitely */}
                      <m.path // Changed to m.path
                        d={`M 320 320 L ${x} ${y}`}
                        stroke="#84cc16"
                        strokeWidth="2"
                        strokeLinecap="round"
                        filter="url(#neon-glow)"
                        initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                        animate={{
                          pathLength: [0, 0.3, 0.3, 0],
                          pathOffset: [0, 0, 0.7, 1],
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                          duration: rayDuration,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: delay + 1.5,
                        }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Render Tiles with Organic Floating Motion */}
            {INTEGRATIONS.tiles.map((tile, i) => (
              <div
                key={tile.key}
                style={{ left: NODE_POS[i][0], top: NODE_POS[i][1] }}
                className="absolute -translate-x-1/2 -translate-y-7"
              >
                <Reveal className="flex flex-col items-center gap-2 whitespace-nowrap">
                  <m.div // Changed to m.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                    className="flex flex-col items-center gap-2"
                  >
                    <Tile tileKey={tile.key} label={tile.label} />
                  </m.div>
                </Reveal>
              </div>
            ))}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Reveal y={0}>
                <Hub />
              </Reveal>
            </div>
          </div>
        </div>

        {/* Below lg: Hub + Simple 4×2 tile grid */}
        <Stagger className="mt-[60px] lg:hidden">
          <StaggerItem y={0} className="mb-10 flex justify-center">
            <Hub size="sm" />
          </StaggerItem>
          <div className="grid grid-cols-4 gap-x-2 gap-y-8">
            {INTEGRATIONS.tiles.map((tile) => (
              <StaggerItem
                key={tile.key}
                className="flex flex-col items-center gap-2"
              >
                <Tile tileKey={tile.key} label={tile.label} />
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </section>
  );
}