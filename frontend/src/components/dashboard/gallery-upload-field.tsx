import { useMutation } from "@tanstack/react-query";
import { Loader2, Plus, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { uploadImagesToCloudinary } from "@/lib/cloudinary";
import { mediaUrl } from "@/lib/media";

export function GalleryUploadField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useMutation({
    mutationFn: (files: FileList) => uploadImagesToCloudinary(Array.from(files)),
    onSuccess: (urls) => {
      onChange([...value, ...urls]);
      toast.success(`${urls.length} image(s) added`);
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    },
  });

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((src, index) => {
            const url = mediaUrl(src);
            return (
              <div
                key={`${src}-${index}`}
                className="relative aspect-video rounded-md border border-border overflow-hidden bg-secondary/30"
              >
                {url ? (
                  <img src={url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground px-2 text-center">
                    {src}
                  </div>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7"
                  onClick={() => removeAt(index)}
                  aria-label="Remove image"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={uploadMutation.isPending}
        onClick={() => inputRef.current?.click()}
      >
        {uploadMutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        Add gallery images
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="sr-only"
        onChange={(e) => {
          const files = e.target.files;
          if (files?.length) uploadMutation.mutate(files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
