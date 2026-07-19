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
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
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

/** Indices of spokes that get the dashed drift animation. */
const ANIMATED = new Set([0, 3, 5]);

function Hub({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <div
      className={
        size === "lg"
          ? "grid size-36 place-items-center rounded-full bg-lime"
          : "grid size-24 place-items-center rounded-full bg-lime"
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
      <span className="grid size-14 place-items-center rounded-lg border border-edge bg-surface-deep">
        <Icon aria-hidden className="size-6 text-lime" strokeWidth={1.75} />
      </span>
      <span className="text-center text-xs leading-tight text-ink-muted">
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
        <Reveal>
          <SectionHeading
            eyebrow={INTEGRATIONS.eyebrow}
            eyebrowGujarati={INTEGRATIONS.eyebrowGujarati}
            title={
              <>
                {INTEGRATIONS.titleLines[0]}
                <br />
                {INTEGRATIONS.titleLines[1]}
              </>
            }
            lede={INTEGRATIONS.lede}
          />
        </Reveal>

        {/* Desktop: radial node web */}
        <Stagger className="relative mx-auto mt-[60px] hidden aspect-square w-full max-w-[640px] lg:block">
          <StaggerItem y={0} className="absolute inset-0">
            <svg
              aria-hidden="true"
              viewBox="0 0 640 640"
              className="pointer-events-none h-full w-full"
            >
              {/* concentric orbit hairlines */}
              <circle
                cx="320"
                cy="320"
                r="160"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <circle
                cx="320"
                cy="320"
                r="260"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              {/* spokes hub → tiles (tile boxes overpaint the ends) */}
              {NODE_POS.map(([x, y], i) => (
                <line
                  key={`${x}-${y}`}
                  x1="320"
                  y1="320"
                  x2={x}
                  y2={y}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray={ANIMATED.has(i) ? "6 6" : undefined}
                  className={ANIMATED.has(i) ? "animate-dash" : undefined}
                />
              ))}
            </svg>
          </StaggerItem>

          {INTEGRATIONS.tiles.map((tile, i) => (
            <div
              key={tile.key}
              style={{ left: NODE_POS[i][0], top: NODE_POS[i][1] }}
              className="absolute -translate-x-1/2 -translate-y-7"
            >
              <StaggerItem className="flex flex-col items-center gap-2 whitespace-nowrap">
                <Tile tileKey={tile.key} label={tile.label} />
              </StaggerItem>
            </div>
          ))}

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <StaggerItem y={0}>
              <Hub />
            </StaggerItem>
          </div>
        </Stagger>

        {/* Below lg: hub + simple 4×2 tile grid, no lines */}
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
