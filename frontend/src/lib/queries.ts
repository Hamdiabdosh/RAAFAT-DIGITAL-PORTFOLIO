import { queryOptions } from "@tanstack/react-query";
import { api } from "./api";
import type { ApiBlogPost, ApiProject, ApiService, ApiTestimonial } from "./types";

export const queryKeys = {
  projects: (params?: Record<string, string>) => ["projects", params] as const,
  project: (slug: string) => ["project", slug] as const,
  services: ["services"] as const,
  service: (slug: string) => ["service", slug] as const,
  blog: (params?: Record<string, string>) => ["blog", params] as const,
  blogPost: (slug: string) => ["blogPost", slug] as const,
  testimonials: ["testimonials"] as const,
};

export const projectsQuery = (params?: Record<string, string>) =>
  queryOptions({
    queryKey: queryKeys.projects(params),
    queryFn: () => api.getProjects(params) as Promise<ApiProject[]>,
  });

export const projectBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: queryKeys.project(slug),
    queryFn: () => api.getProject(slug) as Promise<ApiProject>,
  });

export const servicesQuery = queryOptions({
  queryKey: queryKeys.services,
  queryFn: () => api.getServices() as Promise<ApiService[]>,
});

export const serviceBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: queryKeys.service(slug),
    queryFn: () => api.getService(slug) as Promise<ApiService>,
  });

export const blogPostsQuery = (params?: Record<string, string>) =>
  queryOptions({
    queryKey: queryKeys.blog(params),
    queryFn: () => api.getBlogPosts(params) as Promise<ApiBlogPost[]>,
  });

export const blogPostBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: queryKeys.blogPost(slug),
    queryFn: () => api.getBlogPost(slug) as Promise<ApiBlogPost>,
  });

export const testimonialsQuery = queryOptions({
  queryKey: queryKeys.testimonials,
  queryFn: () => api.getTestimonials() as Promise<ApiTestimonial[]>,
});

export const siteSettingsQuery = queryOptions({
  queryKey: ["site-settings"],
  queryFn: () => api.getSiteSettings(),
  staleTime: 5 * 60 * 1000,
});
