import { z } from "zod";

const projectCategory = z.enum([
  "WEB_DEVELOPMENT",
  "BRANDING",
  "CUSTOM_SOFTWARE",
  "ECOMMERCE",
]);

export const listProjectsQuerySchema = z.object({
  category: projectCategory.optional(),
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  limit: z.coerce.number().int().positive().optional(),
});

export const listAdminProjectsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  published: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
});

export const createProjectSchema = z.object({
  title: z.string().min(1),
  client: z.string().min(1),
  clientType: z.string().min(1),
  category: projectCategory,
  description: z.string().min(1),
  challenge: z.string().min(1),
  solution: z.string().min(1),
  result: z.string().min(1),
  technologies: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  timeline: z.string().min(1),
  coverImage: z.string().optional().nullable(),
  images: z.array(z.string()).default([]),
  liveUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  technicalNotes: z.string().optional().nullable(),
  architectureImage: z.string().optional().nullable(),
  nextSteps: z.string().optional().nullable(),
  metrics: z.record(z.string()).optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
  slug: z.string().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export const reorderProjectsSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number().int(),
    }),
  ),
});
