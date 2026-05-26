import { mediaUrl } from "@/lib/media";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";

export function MediaImage({
  src,
  alt,
  label = "Image",
  aspectRatio = "16/9",
  className,
}: {
  src?: string | null;
  alt: string;
  label?: string;
  aspectRatio?: "16/9" | "1/1" | "4/3";
  className?: string;
}) {
  const url = mediaUrl(src);
  if (!url) {
    return <ImagePlaceholder aspectRatio={aspectRatio} label={label} className={className} />;
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg border border-border bg-secondary",
        aspectRatio === "16/9" && "aspect-video",
        aspectRatio === "1/1" && "aspect-square",
        aspectRatio === "4/3" && "aspect-[4/3]",
        className,
      )}
    >
      <img src={url} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}
