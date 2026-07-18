import { cn } from "@/lib/utils";

/* Tileable SVG grain, inlined as a data URI — no network request. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

type AuroraProps = {
  className?: string;
  /** softer variant for mid-page panels */
  dim?: boolean;
  grid?: boolean;
  grain?: boolean;
};

/**
 * Decorative backdrop: two drifting gradient blobs + faint grid + film grain.
 * Pure CSS/SVG. Parent must be `relative`; place content above with `relative`.
 */
export function Aurora({ className, dim = false, grid = true, grain = true }: AuroraProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className={cn(
          "absolute -top-[28%] left-[-12%] size-[62%] min-h-80 min-w-80 rounded-full blur-[110px] animate-aurora-a",
          dim ? "bg-brand-500/[0.14]" : "bg-brand-500/25",
        )}
      />
      <div
        className={cn(
          "absolute -bottom-[30%] right-[-14%] h-[68%] w-[56%] min-h-72 min-w-72 rounded-full blur-[120px] animate-aurora-b",
          dim ? "bg-aqua-500/[0.10]" : "bg-aqua-500/[0.16]",
        )}
      />
      {grid ? (
        <svg
          className="absolute inset-0 size-full opacity-[0.35] [mask-image:radial-gradient(75%_65%_at_50%_38%,black,transparent)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="aurora-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path
                d="M56 0H0v56"
                fill="none"
                stroke="rgba(232,237,248,0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aurora-grid)" />
        </svg>
      ) : null}
      {grain ? (
        <div
          className="absolute inset-0 opacity-[0.22] mix-blend-soft-light"
          style={{ backgroundImage: GRAIN }}
        />
      ) : null}
    </div>
  );
}
