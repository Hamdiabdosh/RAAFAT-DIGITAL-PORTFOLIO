import { z } from "zod";

const blogCategory = z.enum([
  "WEB_DEVELOPMENT",
  "BRANDING",
  "ECOMMERCE",
  "BUSINESS",
  "DESIGN",
]);

export const listBlogQuerySchema = z.object({
  category: blogCategory.optional(),
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  tag: z.string().optional(),
});

export const listAdminBlogQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  published: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
});

export const createBlogSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  category: blogCategory,
  coverImage: z.string().optional().nullable(),
  readTime: z.number().int().positive(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  slug: z.string().optional(),
  publishedAt: z.coerce.date().optional().nullable(),
});

export const updateBlogSchema = createBlogSchema.partial();
