import { cn } from "@/lib/utils";

type PhoneFrameProps = {
  className?: string;
  children: React.ReactNode;
};

/** CSS-built phone bezel around a mocked mobile page. */
export function PhoneFrame({ className, children }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "w-64 rounded-[2.6rem] border border-white/[0.14] bg-night-950 p-2 shadow-[0_32px_80px_-28px_rgba(7,11,22,0.95)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-night-900">
        <div
          aria-hidden
          className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-night-950"
        />
        {children}
      </div>
    </div>
  );
}
