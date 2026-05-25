import { cn } from "@/lib/utils";

export function ProjectFilter<T extends string>({
  options,
  active,
  onChange,
}: {
  options: readonly T[];
  active: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            active === opt
              ? "bg-gold text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
