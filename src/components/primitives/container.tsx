import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        // measured: Agentify container-md = 1280 centered, 80px page margins at 1440
        "mx-auto w-full max-w-[1280px] px-5 sm:px-8 min-[1360px]:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
