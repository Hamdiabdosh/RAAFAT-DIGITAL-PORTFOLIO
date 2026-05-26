import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ApiProject } from "@/lib/types";

export function CaseStudyNav({
  prev,
  next,
}: {
  prev: ApiProject | null;
  next: ApiProject | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      className="flex flex-col sm:flex-row gap-4 justify-between border-t border-border pt-10"
      aria-label="Project navigation"
    >
      {prev ? (
        <Link
          to="/portfolio/$slug"
          params={{ slug: prev.slug }}
          className="group flex flex-col gap-1 rounded-lg border border-border bg-card p-4 hover:border-gold-soft transition-colors sm:max-w-[48%]"
        >
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="h-3 w-3" />
            Previous
          </span>
          <span className="font-medium group-hover:text-gold transition-colors">{prev.title}</span>
        </Link>
      ) : (
        <div className="hidden sm:block sm:flex-1" />
      )}
      {next ? (
        <Link
          to="/portfolio/$slug"
          params={{ slug: next.slug }}
          className="group flex flex-col gap-1 rounded-lg border border-border bg-card p-4 hover:border-gold-soft transition-colors sm:max-w-[48%] sm:ml-auto sm:text-right"
        >
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground sm:justify-end">
            Next
            <ArrowRight className="h-3 w-3" />
          </span>
          <span className="font-medium group-hover:text-gold transition-colors">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
