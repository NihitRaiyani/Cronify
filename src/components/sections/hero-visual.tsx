import { HERO, type ConsoleRowStatus } from "@/content/hero";
import { cn } from "@/lib/utils";

const C = HERO.console;

const STATUS_STYLE: Record<ConsoleRowStatus, string> = {
  ready: "text-[#3a6b32]",
  generating: "text-[#8a8578]",
  queued: "text-[#a4a09a]",
};

/**
 * Measured Solidroad hero card: white dashboard bleeding off the right edge —
 * cream header strip, three large serif stats, hairline table with green
 * score chips, narrow settings rail on the far right. All our own art/copy.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label={HERO.ariaConsole}
      className={cn(
        "w-[900px] overflow-hidden rounded-t-xl bg-white text-[#322F25] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      {/* header strip */}
      <div className="flex items-center justify-between border-b border-black/[0.06] bg-[#F5F3EC] px-6 py-3.5">
        <span className="font-serif text-[15px]">
          {C.title} — {C.scope}
        </span>
        <span className="flex items-center gap-2">
          <span className="font-gujarati text-[13px] text-[#6C7778]">
            {C.gujarati}
          </span>
          <span className="rounded-full bg-[#DBF400]/60 px-2.5 py-0.5 text-[11px] font-medium text-[#2D2C29]">
            {C.badge}
          </span>
        </span>
      </div>

      <div className="flex">
        {/* main panel */}
        <div className="min-w-0 flex-1 px-6 pb-6">
          {/* stats */}
          <div className="flex gap-16 py-6">
            {C.stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-[42px] font-light leading-none">
                  {s.value}
                </div>
                <div className="mt-2 text-[13px] text-[#87857D]">{s.label}</div>
              </div>
            ))}
          </div>

          {/* table */}
          <div className="grid grid-cols-[1.2fr_1fr_0.7fr_0.8fr] gap-2 border-b border-black/[0.08] pb-2 text-[12px] text-[#87857D]">
            <span>{C.columns.name}</span>
            <span>{C.columns.area}</span>
            <span>{C.columns.score}</span>
            <span />
          </div>
          {C.rows.map((r) => (
            <div
              key={r.area}
              className="grid grid-cols-[1.2fr_1fr_0.7fr_0.8fr] items-center gap-2 border-b border-black/[0.05] py-2 text-[13px]"
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block size-5 rounded-full bg-gradient-to-br from-[#DCD8CB] to-[#B9B4A5]"
                />
                {r.name}
              </span>
              <span className="text-[#87857D]">{r.area}</span>
              <span>
                <span className="inline-block min-w-9 rounded-[4px] bg-[#B8DEA0] px-1.5 py-0.5 text-center text-[12px] font-medium text-[#23421C]">
                  {r.score}
                </span>
              </span>
              <span className={cn("text-[12px]", STATUS_STYLE[r.status])}>
                {C.statusLabels[r.status]}
              </span>
            </div>
          ))}
          <p className="pt-3 text-[11px] text-[#A4A09A]">{C.footer}</p>
        </div>

        {/* right rail */}
        <div className="hidden w-44 shrink-0 border-l border-black/[0.06] px-4 py-5 sm:block">
          {C.sideRail.map((item, i) => (
            <div
              key={item}
              className="border-b border-dashed border-black/[0.08] py-3 text-[13px]"
            >
              <span className={i === 2 ? "font-medium" : "text-[#87857D]"}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
