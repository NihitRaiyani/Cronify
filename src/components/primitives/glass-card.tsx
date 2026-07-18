import { cn } from "@/lib/utils";

type GlassCardProps = {
  className?: string;
  children: React.ReactNode;
  /** Adds hover lift + brighter border. Keep for pointer-interactive cards only. */
  interactive?: boolean;
};

export function GlassCard({ className, children, interactive = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-card",
        interactive &&
          "transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.06] hover:shadow-[0_20px_60px_-24px_rgba(79,70,229,0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
