import { Card } from "@/components/ui/card";
import { projectCategoryLabels } from "@/lib/content";
import type { ApiProject } from "@/lib/types";

export function CaseStudySidebar({ project }: { project: ApiProject }) {
  return (
    <Card className="p-6 h-fit bg-card sticky top-20">
      <h3 className="font-display font-semibold">Project details</h3>
      <dl className="mt-4 space-y-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Client</dt>
          <dd className="font-medium">{project.client}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Service</dt>
          <dd className="font-medium">{projectCategoryLabels[project.category]}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Timeline</dt>
          <dd className="font-medium">{project.timeline}</dd>
        </div>
        {project.technologies.length > 0 && (
          <div>
            <dt className="text-muted-foreground">Stack</dt>
            <dd className="font-medium">{project.technologies.join(", ")}</dd>
          </div>
        )}
      </dl>
    </Card>
  );
}
