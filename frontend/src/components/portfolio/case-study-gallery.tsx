import { MediaImage } from "@/components/ui/media-image";
import type { ApiProject } from "@/lib/types";

export function CaseStudyGallery({ project }: { project: ApiProject }) {
  const gallery = project.images.filter(Boolean);
  if (gallery.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Project gallery</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {gallery.map((src, i) => (
          <MediaImage
            key={`${src}-${i}`}
            src={src}
            alt={`${project.title} — screenshot ${i + 1}`}
            label={`Screenshot ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
