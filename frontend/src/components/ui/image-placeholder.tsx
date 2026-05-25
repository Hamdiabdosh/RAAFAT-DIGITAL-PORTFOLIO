import { cn } from "@/lib/utils";

const aspectMap = {
  "16/9": "aspect-video",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
} as const;

export function ImagePlaceholder({
  aspectRatio = "16/9",
  label = "Image",
  className,
}: {
  aspectRatio?: keyof typeof aspectMap;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full rounded-lg bg-secondary border border-border flex items-center justify-center overflow-hidden transition-colors duration-200 hover:border-gold-soft",
        aspectMap[aspectRatio],
        className,
      )}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
