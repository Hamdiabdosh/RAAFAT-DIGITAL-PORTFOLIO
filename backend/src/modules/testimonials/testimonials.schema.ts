import { z } from "zod";

export const listTestimonialsQuerySchema = z.object({
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? true : v === "true")),
});

export const createTestimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  company: z.string().optional().nullable(),
  quote: z.string().min(1),
  avatar: z.string().optional().nullable(),
  rating: z.number().int().min(1).max(5).default(5),
  featured: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();
