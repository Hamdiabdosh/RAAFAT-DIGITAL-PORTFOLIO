import { cn } from "@/lib/utils";

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">{label}</p>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-muted-foreground max-w-xl text-base",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
