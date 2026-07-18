import { cn } from "@/lib/utils";

type ScoreMeterProps = {
  /** presence score, 0–100, higher = more digitally present */
  score: number;
  className?: string;
  showValue?: boolean;
};

/**
 * The presence-score motif: a thin meter with tick marks. Low scores glow
 * amber (the opportunity), higher scores run indigo→cyan.
 */
export function ScoreMeter({ score, className, showValue = true }: ScoreMeterProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const low = clamped < 45;
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full",
            low
              ? "bg-gradient-to-r from-spark-500 to-spark-300"
              : "bg-gradient-to-r from-brand-400 to-aqua-400",
          )}
          style={{ width: `${clamped}%` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_calc(10%-1px),rgba(11,16,32,0.9)_calc(10%-1px),rgba(11,16,32,0.9)_10%)]"
        />
      </div>
      {showValue ? (
        <span
          className={cn(
            "w-7 text-right text-xs font-semibold tabular-nums",
            low ? "text-spark-300" : "text-aqua-300",
          )}
        >
          {clamped}
        </span>
      ) : null}
    </div>
  );
}
