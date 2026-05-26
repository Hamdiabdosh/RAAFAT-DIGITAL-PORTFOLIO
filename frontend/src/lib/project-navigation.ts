import type { ApiProject } from "./types";

export function sortProjectsByOrder(projects: ApiProject[]): ApiProject[] {
  return [...projects].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getAdjacentProjects(
  projects: ApiProject[],
  currentSlug: string,
): { prev: ApiProject | null; next: ApiProject | null } {
  const sorted = sortProjectsByOrder(projects);
  const index = sorted.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? sorted[index - 1]! : null,
    next: index < sorted.length - 1 ? sorted[index + 1]! : null,
  };
}
