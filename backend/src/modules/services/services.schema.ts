import { z } from "zod";

const processStepSchema = z.object({
  step: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
});

const faqSchema = z.object({
  question: z.string().optional(),
  answer: z.string().optional(),
  q: z.string().optional(),
  a: z.string().optional(),
});

export const createServiceSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  startingPrice: z.string().min(1),
  includes: z.array(z.string()).default([]),
  processSteps: z.array(processStepSchema).default([]),
  faqs: z.array(faqSchema).default([]),
  order: z.number().int().default(0),
  active: z.boolean().default(true),
  slug: z.string().optional(),
});

export const updateServiceSchema = createServiceSchema.partial();

export const reorderServicesSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number().int(),
    }),
  ),
});
