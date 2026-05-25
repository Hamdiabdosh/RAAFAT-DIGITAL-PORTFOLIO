import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
  noPadding,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  noPadding?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(!noPadding && "py-24 px-4 sm:px-6 lg:px-8", className)}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
