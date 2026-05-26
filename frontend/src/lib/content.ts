import type { ApiBlogPost, ApiProject, BlogCategory, ProjectCategory } from "./types";

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  WEB_DEVELOPMENT: "Web Development",
  BRANDING: "Branding",
  CUSTOM_SOFTWARE: "Custom Software",
  ECOMMERCE: "E-commerce",
};

export const blogCategoryLabels: Record<BlogCategory, string> = {
  WEB_DEVELOPMENT: "Web Development",
  BRANDING: "Branding",
  ECOMMERCE: "E-commerce",
  BUSINESS: "Business",
  DESIGN: "Design",
};

export const portfolioFilters = [
  "All",
  "Web Development",
  "Branding",
  "Custom Software",
  "E-commerce",
] as const;

export const blogFilters = [
  "All",
  "Web Development",
  "Branding",
  "E-commerce",
  "Business",
  "Design",
] as const;

export type PortfolioFilter = (typeof portfolioFilters)[number];
export type BlogFilter = (typeof blogFilters)[number];

const projectLabelToEnum: Record<string, ProjectCategory> = {
  "Web Development": "WEB_DEVELOPMENT",
  Branding: "BRANDING",
  "Custom Software": "CUSTOM_SOFTWARE",
  "E-commerce": "ECOMMERCE",
};

const blogLabelToEnum: Record<string, BlogCategory> = {
  "Web Development": "WEB_DEVELOPMENT",
  Branding: "BRANDING",
  "E-commerce": "ECOMMERCE",
  Business: "BUSINESS",
  Design: "DESIGN",
};

export const serviceSlugToProjectCategory: Record<string, ProjectCategory> = {
  "web-development": "WEB_DEVELOPMENT",
  branding: "BRANDING",
  "custom-software": "CUSTOM_SOFTWARE",
  ecommerce: "ECOMMERCE",
};

export function formatBlogDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatReadTime(minutes: number): string {
  return `${minutes} min read`;
}

export function projectMetrics(
  metrics: ApiProject["metrics"],
): { value: string; label: string }[] {
  if (!metrics || typeof metrics !== "object") return [];
  const labelMap: Record<string, string> = {
    traffic: "Online traffic",
    delivery: "Delivery time",
    satisfaction: "Client satisfaction",
  };
  return Object.entries(metrics).map(([key, value]) => ({
    value: String(value),
    label: labelMap[key] ?? key.replace(/_/g, " "),
  }));
}

export function filterProjects(
  projects: ApiProject[],
  filter: PortfolioFilter,
): ApiProject[] {
  if (filter === "All") return projects;
  const category = projectLabelToEnum[filter];
  return projects.filter((p) => p.category === category);
}

export function filterBlogPosts(posts: ApiBlogPost[], filter: BlogFilter): ApiBlogPost[] {
  if (filter === "All") return posts;
  const category = blogLabelToEnum[filter];
  return posts.filter((p) => p.category === category);
}

export function testimonialDisplayRole(t: {
  role: string;
  company?: string | null;
}): string {
  return t.company ? `${t.role}, ${t.company}` : t.role;
}

export function testimonialInitials(name: string, avatar?: string | null): string {
  if (avatar && avatar.length <= 3) return avatar;
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
