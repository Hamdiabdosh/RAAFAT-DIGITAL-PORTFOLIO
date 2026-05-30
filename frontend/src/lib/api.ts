import type { ApiBlogPost, ApiProject, ApiService, ApiTestimonial } from "./types";
import { clearAdminToken, getAdminToken } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

export class UnauthorizedError extends Error {
  constructor(message = "Authentication required") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  meta?: Record<string, unknown>;
};

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  const data = (await res.json()) as ApiResponse<T>;

  if (res.status === 401) {
    clearAdminToken();
    throw new UnauthorizedError(data.error || "Authentication required");
  }

  if (!res.ok || !data.success) {
    throw new Error(data.error || `API error (${res.status})`);
  }
  return data.data as T;
}

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
};

export type DashboardStats = {
  messages: { total: number; unread: number };
  projects: { total: number; published: number };
  blog: { total: number; published: number; drafts: number };
  testimonials: { total: number };
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  serviceInterest?: string | null;
  budgetRange?: string | null;
  description: string;
  hearAboutUs?: string | null;
  status: "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";
  notes?: string | null;
  createdAt: string;
};

export const api = {
  login: (body: { email: string; password: string }) =>
    request<{ token: string; admin: AdminUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  me: () => request<AdminUser>("/auth/me"),

  getProjects: (params?: Record<string, string>) =>
    request<ApiProject[]>(`/projects?${new URLSearchParams(params ?? {})}`),

  getProject: (slug: string) => request<ApiProject>(`/projects/${slug}`),

  getBlogPosts: (params?: Record<string, string>) =>
    request<ApiBlogPost[]>(`/blog?${new URLSearchParams(params ?? {})}`),

  getBlogPost: (slug: string) => request<ApiBlogPost>(`/blog/${slug}`),

  getServices: () => request<ApiService[]>("/services"),

  getService: (slug: string) => request<ApiService>(`/services/${slug}`),

  getTestimonials: (params?: Record<string, string>) =>
    request<ApiTestimonial[]>(`/testimonials?${new URLSearchParams(params ?? {})}`),

  getSiteSettings: () => request<Record<string, string>>("/settings"),

  submitContact: (body: object) =>
    request<{ message: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  admin: {
    getMessages: (params?: Record<string, string>) =>
      request<ContactMessage[]>(`/admin/contact?${new URLSearchParams(params ?? {})}`),

    getMessage: (id: string) => request<ContactMessage>(`/admin/contact/${id}`),

    updateMessage: (id: string, body: object) =>
      request<ContactMessage>(`/admin/contact/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),

    deleteMessage: (id: string) =>
      request<{ message: string }>(`/admin/contact/${id}`, { method: "DELETE" }),

    getStats: () => request<DashboardStats>("/admin/stats"),

    getProjects: (params?: Record<string, string>) =>
      request<unknown[]>(`/admin/projects?${new URLSearchParams(params ?? {})}`),

    createProject: (body: object) =>
      request<unknown>("/admin/projects", { method: "POST", body: JSON.stringify(body) }),

    updateProject: (id: string, body: object) =>
      request<unknown>(`/admin/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),

    deleteProject: (id: string) =>
      request<{ message: string }>(`/admin/projects/${id}`, { method: "DELETE" }),

    reorderProjects: (items: { id: string; order: number }[]) =>
      request<{ message: string }>("/admin/projects/reorder", {
        method: "PUT",
        body: JSON.stringify({ items }),
      }),

    getBlogPosts: (params?: Record<string, string>) =>
      request<unknown[]>(`/admin/blog?${new URLSearchParams(params ?? {})}`),

    createPost: (body: object) =>
      request<unknown>("/admin/blog", { method: "POST", body: JSON.stringify(body) }),

    updatePost: (id: string, body: object) =>
      request<unknown>(`/admin/blog/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),

    deletePost: (id: string) =>
      request<{ message: string }>(`/admin/blog/${id}`, { method: "DELETE" }),

    getTestimonials: () => request<unknown[]>("/admin/testimonials"),

    createTestimonial: (body: object) =>
      request<unknown>("/admin/testimonials", {
        method: "POST",
        body: JSON.stringify(body),
      }),

    updateTestimonial: (id: string, body: object) =>
      request<unknown>(`/admin/testimonials/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),

    deleteTestimonial: (id: string) =>
      request<{ message: string }>(`/admin/testimonials/${id}`, { method: "DELETE" }),

    deleteImage: (url: string) =>
      request<{ message: string }>("/admin/upload", {
        method: "DELETE",
        body: JSON.stringify({ url }),
      }),

    getSettings: () => request<Record<string, string>>("/admin/settings"),

    updateSettings: (settings: { key: string; value: string }[]) =>
      request<Record<string, string>>("/admin/settings", {
        method: "PUT",
        body: JSON.stringify({ settings }),
      }),
  },
};

export { BASE_URL as API_BASE_URL };
