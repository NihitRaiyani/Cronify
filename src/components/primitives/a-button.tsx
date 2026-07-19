import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type AButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "lime" | "light";
  className?: string;
  arrow?: boolean;
};

/**
 * Measured Agentify button: sharp rectangle, 48px tall, dark 16px/500 label,
 * ArrowUpRight glyph, 1px frame floating 4px outside the fill (frame-lime /
 * frame-light utilities in globals.css).
 */
export function AButton({
  href,
  children,
  variant = "lime",
  className,
  arrow = true,
}: AButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 px-6 font-sans text-base font-medium text-ink-inverse transition-transform duration-200 hover:-translate-y-0.5",
        variant === "lime" ? "frame-lime bg-lime" : "frame-light bg-white",
        className,
      )}
    >
      {children}
      {arrow ? <ArrowUpRight className="size-4" strokeWidth={2.4} /> : null}
    </a>
  );
}
