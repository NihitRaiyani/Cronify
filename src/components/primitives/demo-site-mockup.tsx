import { SHOWCASE } from "@/content/showcase";
import { cn } from "@/lib/utils";

/**
 * CSS recreation of a generated demo-site draft (kirana vertical). Self-evidently
 * a placeholder: "શ્રી …" identity, "from the listing" labels, and the
 * hidden-section rule made visible. Decorative — wrap in a role="img" container
 * with a caption. (The showcase section renders its own inline mock; this
 * primitive stays available for other frames.)
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
        <div className="min-w-0">
          <p
            className={cn(
              "truncate font-gujarati font-semibold tracking-tight",
              mobile ? "text-sm" : "text-lg",
            )}
          >
            {m.name}
          </p>
          <p className="text-[9px] uppercase tracking-[0.14em] text-[#8A7A66]">
            {m.nameSub}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border border-[#241F1A]/20 text-[#8A7A66]",
            mobile ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]",
          )}
        >
          {m.lang}
        </span>
      </div>

      {/* demo hero */}
      <div
        className={cn(
          "mt-4 rounded-lg bg-gradient-to-br from-[#F3EADA] to-[#E2D0B4]",
          mobile ? "p-3" : "p-5",
        )}
      >
        <p
          className={cn(
            "font-gujarati font-semibold leading-snug",
            mobile ? "text-base" : "text-2xl",
          )}
        >
          {m.heroTitle}
        </p>
        <p className={cn("mt-1 text-[#8A7A66]", mobile ? "text-[10px]" : "text-xs")}>
          {m.heroSub}
        </p>
        <span
          className={cn(
            "mt-3 inline-block bg-lime font-gujarati font-semibold text-ink-inverse",
            mobile ? "px-2.5 py-1 text-[10px]" : "px-3.5 py-1.5 text-xs",
          )}
        >
          {m.heroCta}
        </span>
      </div>

      {/* fact-backed strips */}
      <div className="mt-3 grid gap-2">
        {m.strips.map((strip) => (
          <div
            key={strip.label}
            className="flex items-center justify-between gap-3 rounded-lg border border-[#241F1A]/[0.08] bg-white/70 px-3.5 py-2.5"
          >
            <div className="min-w-0">
              <p className="font-gujarati font-semibold leading-tight">{strip.label}</p>
              <p className="mt-0.5 text-[10px] text-[#8A7A66]">{strip.sub}</p>
            </div>
            {"chip" in strip ? (
              <span className="shrink-0 rounded-full border border-[#A3763B]/40 bg-[#A3763B]/10 px-2 py-1 font-gujarati text-[10px] font-medium text-[#7C5A2D]">
                {strip.chip}
              </span>
            ) : null}
          </div>
        ))}
        <div
          className={cn(
            "rounded-lg border border-dashed border-[#241F1A]/20 px-3.5 py-3 text-center uppercase tracking-[0.16em] text-[#8A7A66]",
            mobile ? "text-[9px]" : "text-[10px]",
          )}
        >
          {m.hidden}
        </div>
      </div>
    </div>
  );
}
