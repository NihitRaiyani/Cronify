import { SHOWCASE } from "@/content/showcase";
import { cn } from "@/lib/utils";

/**
 * CSS recreation of a generated demo site (clinic vertical), warm-editorial like
 * the real templates. Self-evidently a placeholder: bilingual "your clinic here"
 * identity, "from the listing" labels, and the hidden-section rule made visible.
 * Decorative — wrap in a role="img" container with a caption.
 */
export function DemoSiteMockup({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const m = SHOWCASE.mock;
  const mobile = variant === "mobile";
  return (
    <div
      className={cn(
        "bg-[#FBF6EE] text-[#241F1A]",
        mobile ? "p-4 text-[11px]" : "p-6 text-[13px] sm:p-8",
      )}
    >
      {/* demo navbar */}
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "font-serif tracking-tight text-[#241F1A]",
            mobile ? "text-sm" : "text-lg",
          )}
        >
          {m.brandGujarati}
        </span>
        {!mobile ? (
          <span className="flex items-center gap-4 text-[11px] tracking-wide text-[#8A7A66]">
            {m.navLinks.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </span>
        ) : null}
        <span
          className={cn(
            "rounded-full bg-[#A3763B] font-medium text-[#FBF6EE]",
            mobile ? "px-2.5 py-1 text-[10px]" : "px-3.5 py-1.5 text-[11px]",
          )}
        >
          {m.navCta}
        </span>
      </div>

      {/* demo hero */}
      <div
        className={cn(
          "mt-5 grid items-center gap-5",
          mobile ? "grid-cols-1" : "grid-cols-[1.1fr_0.9fr] gap-8",
        )}
      >
        <div>
          <p
            className={cn(
              "font-serif leading-tight",
              mobile ? "text-xl" : "text-3xl",
            )}
          >
            {m.brandGujarati}
          </p>
          <p
            className={cn(
              "font-serif italic text-[#A3763B]",
              mobile ? "text-sm" : "text-xl",
            )}
          >
            {m.brandLatin}
          </p>
          <p className="mt-2 text-[#8A7A66]">{m.whatWhere}</p>
          <div className="mt-4 flex gap-2">
            <span
              className={cn(
                "rounded-full bg-[#241F1A] text-[#FBF6EE]",
                mobile ? "px-3 py-1.5 text-[10px]" : "px-4 py-2 text-[11px]",
              )}
            >
              {m.heroCta1}
            </span>
            <span
              className={cn(
                "rounded-full border border-[#241F1A]/25",
                mobile ? "px-3 py-1.5 text-[10px]" : "px-4 py-2 text-[11px]",
              )}
            >
              {m.heroCta2}
            </span>
          </div>
        </div>
        <div className="relative">
          <div
            className={cn(
              "w-full rounded-t-full bg-gradient-to-b from-[#D8C4A5] via-[#C2A87F] to-[#8A7A66]",
              mobile ? "h-32" : "h-48",
            )}
          />
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#241F1A]/70 px-2.5 py-1 text-[9px] tracking-wide text-[#FBF6EE]">
            {m.photoNote}
          </span>
        </div>
      </div>

      {/* services */}
      <div className={cn("mt-6", mobile && "mt-5")}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={cn("font-serif", mobile ? "text-base" : "text-xl")}>
            {m.servicesTitle}
          </p>
          <span className="rounded-full border border-[#A3763B]/40 bg-[#A3763B]/10 px-2.5 py-1 text-[9px] tracking-wide text-[#7C5A2D]">
            {m.servicesNote}
          </span>
        </div>
        <div className={cn("mt-3 grid gap-2.5", mobile ? "grid-cols-1" : "grid-cols-2")}>
          {m.services.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between gap-3 rounded-xl border border-[#241F1A]/[0.08] bg-white/70 px-3.5 py-3"
            >
              <span className={cn(mobile ? "text-[11px]" : "text-[13px]")}>{s.name}</span>
              <span className="flex items-center gap-1.5">
                <span className="font-medium tabular-nums">{s.range}</span>
                <span className="rounded border border-[#A3763B]/50 px-1 py-px text-[8px] tracking-wider text-[#7C5A2D]">
                  {s.badge}
                </span>
              </span>
            </div>
          ))}
          <div
            className={cn(
              "rounded-xl border border-dashed border-[#241F1A]/20 px-3.5 py-3 text-center italic text-[#8A7A66]",
              mobile ? "text-[10px]" : "text-[11px]",
              !mobile && "col-span-2",
            )}
          >
            {m.hiddenNote}
          </div>
        </div>
      </div>

      {/* contact strip */}
      <div
        className={cn(
          "mt-5 flex items-center justify-between gap-3 rounded-xl bg-[#241F1A] px-4 py-3 text-[#FBF6EE]",
          mobile && "px-3 py-2.5",
        )}
      >
        <span className={cn("font-serif", mobile ? "text-xs" : "text-sm")}>
          {m.contactTitle}
        </span>
        <span className={cn("text-[#FBF6EE]/70", mobile ? "text-[9px]" : "text-[11px]")}>
          {m.contactLine}
        </span>
        <span
          className={cn(
            "rounded-full border border-[#FBF6EE]/30 px-2.5 py-1",
            mobile ? "text-[9px]" : "text-[10px]",
          )}
        >
          {m.langChip}
        </span>
      </div>
    </div>
  );
}
