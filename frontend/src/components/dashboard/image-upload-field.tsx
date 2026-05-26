import { useMutation } from "@tanstack/react-query";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { mediaUrl } from "@/lib/media";
import { cn } from "@/lib/utils";

type ImageUploadFieldProps = {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
};

export function ImageUploadField({
  id,
  label,
  hint,
  value,
  onChange,
  className,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = mediaUrl(value);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("images", file);
      return api.admin.uploadImage(formData);
    },
    onSuccess: (data) => {
      const url = data.files[0]?.url;
      if (url) {
        onChange(url);
        toast.success("Image uploaded");
      }
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    },
  });

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}

      {preview ? (
        <div className="relative rounded-lg border border-border overflow-hidden bg-secondary/30">
          <img src={preview} alt="" className="w-full max-h-48 object-cover" />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={() => onChange("")}
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploadMutation.isPending}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-8 text-sm text-muted-foreground hover:border-gold-soft hover:bg-muted/50 transition-colors disabled:opacity-50"
        >
          {uploadMutation.isPending ? (
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          ) : (
            <ImageIcon className="h-8 w-8 opacity-50" />
          )}
          <span>{uploadMutation.isPending ? "Uploading…" : "Click to upload"}</span>
          <span className="text-xs">PNG, JPG, WebP · max 5 MB</span>
        </button>
      )}

      <div className="flex gap-2">
        <Input
          id={id}
          placeholder="Or paste image URL /uploads/..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="shrink-0"
          onClick={() => inputRef.current?.click()}
          disabled={uploadMutation.isPending}
          aria-label="Upload file"
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadMutation.mutate(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
