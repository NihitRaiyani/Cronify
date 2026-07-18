import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  /** Display-only text in the address pill (not a link). */
  address: string;
  className?: string;
  children: React.ReactNode;
};

/** CSS-built browser chrome around a mocked page. */
export function BrowserFrame({ address, className, children }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-white/10 bg-night-800 shadow-[0_32px_80px_-32px_rgba(7,11,22,0.9)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/[0.14]" />
          <span className="size-2.5 rounded-full bg-white/[0.14]" />
          <span className="size-2.5 rounded-full bg-white/[0.14]" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-[70%] items-center gap-1.5 rounded-full border border-white/[0.06] bg-night-900/80 px-3 py-1 text-[11px] text-ink-faint">
          <svg
            aria-hidden
            viewBox="0 0 12 12"
            className="size-3 shrink-0 fill-none stroke-current"
            strokeWidth="1.2"
          >
            <rect x="2.5" y="5" width="7" height="5" rx="1" />
            <path d="M4 5V3.8a2 2 0 0 1 4 0V5" />
          </svg>
          <span className="truncate">{address}</span>
        </div>
        <div aria-hidden className="w-10" />
      </div>
      {children}
    </div>
  );
}
