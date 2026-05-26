import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/context/language-context";
import { projectCategoryLabels } from "@/lib/content";
import type { ApiProject } from "@/lib/types";
import { MediaImage } from "@/components/ui/media-image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, className }: { project: ApiProject; className?: string }) {
  const { t } = useLanguage();

  return (
    <Card
      className={cn(
        "overflow-hidden bg-card border-border hover:-translate-y-0.5 transition-all duration-200 group",
        className,
      )}
    >
      <MediaImage
        src={project.coverImage}
        alt={project.title}
        label={project.title}
        className="rounded-none border-0 border-b group-hover:border-gold-soft"
      />
      <div className="p-5">
        <Badge variant="outline" className="border-gold-soft text-gold bg-gold-dim">
          {projectCategoryLabels[project.category]}
        </Badge>
        <h3 className="mt-3 font-display text-lg font-bold">{project.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{project.clientType}</p>
        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
        <Link
          to="/portfolio/$slug"
          params={{ slug: project.slug }}
          className="mt-4 inline-flex text-sm text-gold hover:underline"
        >
          {t("sections.viewCaseStudy")} →
        </Link>
      </div>
    </Card>
  );
}
