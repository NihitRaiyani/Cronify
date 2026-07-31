import { cn } from "@/lib/utils";

/** Measured ref speed, expressed as the seconds one set takes to travel its own
 *  width (~85px/s over a 1518px set). Duration scales with setsPerHalf so the
 *  pixel speed is identical however wide the track gets. */
const SECONDS_PER_SET = 18;

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  /** gap + padding classes for each half-track */
  trackClassName?: string;
  /**
   * Copies of `children` inside each half. The track is always exactly two
   * halves translating -50%, so the loop stays seamless whatever this is — but
   * one half must be at least as wide as the viewport, or a gap opens at the
   * right edge once the first half has scrolled past. Raise this when a single
   * set is narrower than the widest screen you support.
   */
  setsPerHalf?: number;
  /** pause the scroll while the pointer is over the band */
  pauseOnHover?: boolean;
};

/**
 * Pure-CSS marquee: the track holds two identical halves and translates -50%,
 * so the wrap point is pixel-exact and never drifts.
 * The global reduced-motion rule freezes it into a static row.
 */
export function Marquee({
  children,
  className,
  trackClassName,
  setsPerHalf = 1,
  pauseOnHover = false,
}: MarqueeProps) {
  const half = (
    <div className={cn("flex shrink-0 items-center gap-4 pr-4", trackClassName)}>
      {Array.from({ length: setsPerHalf }, (_, i) => (
        <div key={i} className="contents">
          {children}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max animate-marquee [backface-visibility:hidden] [will-change:transform]",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${SECONDS_PER_SET * setsPerHalf}s` }}
      >
        {half}
        {/* duplicate for the wrap; hidden so the row is announced once */}
        <div aria-hidden className="contents">
          {half}
        </div>
      </div>
    </div>
  );
}
