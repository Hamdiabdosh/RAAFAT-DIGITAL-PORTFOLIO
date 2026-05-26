import { z } from "zod";

export const submitContactSchema = z
  .object({
    name: z.string().min(2).optional(),
    fullName: z.string().min(2).optional(),
    email: z.string().email(),
    phone: z.string().optional(),
    serviceInterest: z.string().optional(),
    service: z.string().optional(),
    budgetRange: z.string().optional(),
    budget: z.string().optional(),
    description: z.string().min(20),
    hearAboutUs: z.string().optional(),
    source: z.string().optional(),
  })
  .refine((d) => d.name || d.fullName, { message: "Name is required", path: ["name"] })
  .refine((d) => d.serviceInterest || d.service, {
    message: "Service interest is required",
    path: ["serviceInterest"],
  })
  .refine((d) => d.budgetRange || d.budget, {
    message: "Budget range is required",
    path: ["budgetRange"],
  })
  .refine((d) => d.hearAboutUs || d.source, {
    message: "Source is required",
    path: ["hearAboutUs"],
  })
  .transform((d) => ({
    name: d.name ?? d.fullName!,
    email: d.email,
    phone: d.phone,
    serviceInterest: d.serviceInterest ?? d.service!,
    budgetRange: d.budgetRange ?? d.budget!,
    description: d.description,
    hearAboutUs: d.hearAboutUs ?? d.source!,
  }));

export const listContactQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z.enum(["UNREAD", "READ", "REPLIED", "ARCHIVED"]).optional(),
});

export const updateContactSchema = z.object({
  status: z.enum(["UNREAD", "READ", "REPLIED", "ARCHIVED"]).optional(),
  notes: z.string().optional(),
});
