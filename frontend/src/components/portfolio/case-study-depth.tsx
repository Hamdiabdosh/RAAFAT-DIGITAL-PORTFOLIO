import { Card } from "@/components/ui/card";
import { MediaImage } from "@/components/ui/media-image";
import { projectMetrics } from "@/lib/content";
import type { ApiProject } from "@/lib/types";

export function CaseStudyDepth({ project }: { project: ApiProject }) {
  const metrics = projectMetrics(project.metrics);
  const hasDepth =
    metrics.length > 0 ||
    project.technicalNotes ||
    project.architectureImage ||
    project.nextSteps;

  if (!hasDepth) return null;

  return (
    <div className="space-y-12">
      {metrics.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold">Outcomes</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-5">
            {metrics.map((m) => (
              <Card key={m.label} className="p-6 text-center bg-card">
                <p className="font-display text-3xl text-gold font-bold">{m.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {project.technicalNotes && (
        <div>
          <h2 className="font-display text-2xl font-bold">Technical approach</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">
            {project.technicalNotes}
          </p>
        </div>
      )}

      {project.architectureImage && (
        <div>
          <h2 className="font-display text-2xl font-bold">Architecture</h2>
          <MediaImage
            src={project.architectureImage}
            alt={`${project.title} architecture`}
            label="Architecture diagram"
            className="mt-6"
          />
        </div>
      )}

      {project.nextSteps && (
        <Card className="p-6 bg-card border-gold-soft/50">
          <h2 className="font-display text-xl font-semibold">What&apos;s next</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {project.nextSteps}
          </p>
        </Card>
      )}
    </div>
  );
}
