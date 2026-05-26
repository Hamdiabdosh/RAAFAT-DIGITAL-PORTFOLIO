import { Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";
import { projectCategoryLabels } from "@/lib/content";
import { embedVideoUrl } from "@/lib/embed-video";
import type { ApiProject } from "@/lib/types";

export function CaseStudyHero({ project }: { project: ApiProject }) {
  const videoEmbed = embedVideoUrl(project.videoUrl);

  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>
      </div>

      <MediaImage
        src={project.coverImage}
        alt={project.title}
        label={project.title}
        className="rounded-none border-x-0 border-t-0 max-h-[min(70vh,520px)]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
          {projectCategoryLabels[project.category]}
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold">{project.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {project.description}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{project.clientType}</p>

        {project.technologies.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.technologies.slice(0, 8).map((tech) => (
              <li
                key={tech}
                className="px-3 py-1 rounded-full text-sm bg-secondary text-muted-foreground border border-border"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <Button asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                View live site
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="outline">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
          {project.videoUrl && !videoEmbed && (
            <Button asChild variant="outline">
              <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                <Play className="h-4 w-4" />
                Watch demo
              </a>
            </Button>
          )}
          <Button asChild variant={project.liveUrl ? "outline" : "default"}>
            <Link to="/contact">Start a similar project</Link>
          </Button>
        </div>
      </div>

      {videoEmbed && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="aspect-video rounded-xl overflow-hidden border border-border bg-card">
            <iframe
              src={videoEmbed}
              title={`${project.title} demo`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
