import type { Request, Response } from "express";
import type { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { sendError, sendSuccess } from "../../utils/response";

export async function listPublic(req: Request, res: Response) {
  const { featured } = req.query as { featured?: boolean };

  const where: Prisma.TestimonialWhereInput =
    featured !== undefined ? { featured } : { featured: true };

  const testimonials = await prisma.testimonial.findMany({
    where,
    orderBy: { order: "asc" },
  });

  return sendSuccess(res, testimonials);
}

export async function listAdmin(_req: Request, res: Response) {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });
  return sendSuccess(res, testimonials);
}

export async function create(req: Request, res: Response) {
  const body = req.body;
  const testimonial = await prisma.testimonial.create({ data: body });
  return sendSuccess(res, testimonial, 201);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: req.body,
  });
  return sendSuccess(res, testimonial);
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prisma.testimonial.delete({ where: { id } });
    return sendSuccess(res, { message: "Deleted successfully" });
  } catch {
    return sendError(res, "Testimonial not found", "NOT_FOUND", 404);
  }
}
