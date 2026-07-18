import { cn } from "@/lib/utils";

/** Italic serif accent for a word or two inside display headlines. */
export function Serif({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-serif italic font-normal tracking-normal text-gradient-brand",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small uppercase chip above a section heading, with optional Gujarati accent. */
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
        "inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-dim",
        className,
      )}
    >
      <span
        aria-hidden
        className="size-1.5 rounded-full bg-gradient-to-r from-brand-400 to-aqua-400"
      />
      {children}
      {gujarati ? (
        <span className="font-gujarati text-[13px] normal-case leading-none tracking-normal text-aqua-300/90">
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
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <Eyebrow gujarati={eyebrowGujarati}>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-[22ch] font-display text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-5xl">
        {title}
      </h2>
      {lede ? (
        <p className="max-w-xl text-base leading-relaxed text-ink-dim sm:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
