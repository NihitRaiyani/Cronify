import { cn } from "@/lib/utils";

/** Serif accent — kept for the hero register (Fraunces). */
export function Serif({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("font-serif font-light tracking-normal", className)}>
      {children}
    </span>
  );
}

/** Minimal label line above a heading — the measured design has no chip, so
 *  this is quiet uppercase text with the Gujarati accent inline. */
export function Eyebrow({
  children,
  gujarati,
  className,
}: {
  children: React.ReactNode;
  gujarati?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-ink-muted",
        className,
      )}
    >
      {children}
      {gujarati ? (
        <span className="font-gujarati text-[13px] normal-case leading-none tracking-normal text-lime/90">
          {gujarati}
        </span>
      ) : null}
    </span>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  eyebrowGujarati?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Measured Agentify heading block: centered Inter Tight 48/57.6 w600 white,
 *  16/24 muted lede below. */
export function SectionHeading({
  eyebrow,
  eyebrowGujarati,
  title,
  lede,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <Eyebrow gujarati={eyebrowGujarati}>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-[24ch] font-display text-[32px] font-semibold leading-[1.2] text-ink sm:text-[40px] lg:text-[48px]">
        {title}
      </h2>
      {lede ? (
        <p className="max-w-xl font-sans text-base leading-6 text-ink-muted">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
