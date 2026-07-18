import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  /** gap + padding classes for each half-track */
  trackClassName?: string;
};

/**
 * Pure-CSS marquee: the track holds two identical halves and translates -50%.
 * The global reduced-motion rule freezes it into a static row.
 */
export function Marquee({ children, className, trackClassName }: MarqueeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max animate-marquee">
        <div className={cn("flex shrink-0 items-center gap-4 pr-4", trackClassName)}>
          {children}
        </div>
        <div
          aria-hidden
          className={cn("flex shrink-0 items-center gap-4 pr-4", trackClassName)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
