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
 * frame-light utilities in globals.css). The fill is an inner layer carrying
 * the torn-paper right edge (ref signature) so the frame stays a clean line.
 */
export function AButton({
  href,
  children,
  variant = "lime",
  className,
  arrow = true,
}: AButtonProps) {
  const label = (
    <>
      {children}
      {arrow ? <ArrowUpRight className="size-4" strokeWidth={2.4} /> : null}
    </>
  );
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex h-12 items-center justify-center px-6 font-sans text-base font-medium text-ink-inverse",
        variant === "lime" ? "frame-lime" : "frame-light",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "torn-edge absolute inset-0 shadow-[inset_0_-5px_0_rgba(255,255,255,0.14)]",
          variant === "lime" ? "bg-lime" : "bg-white",
        )}
      />
      {/* measured hover: label stack slides one line height, duplicate fades in */}
      <span className="relative block h-6 overflow-hidden">
        <span className="flex flex-col transition-transform duration-[350ms] ease-out group-hover:-translate-y-6">
          <span className="flex h-6 items-center justify-center gap-2">{label}</span>
          <span
            aria-hidden
            className="flex h-6 items-center justify-center gap-2 opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100"
          >
            {label}
          </span>
        </span>
      </span>
    </a>
  );
}
