import type { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { uniqueSlug } from "../../utils/slug";
import { sendError, sendSuccess } from "../../utils/response";

function normalizeFaqs(faqs: { question?: string; answer?: string; q?: string; a?: string }[]) {
  return faqs.map((f) => ({
    question: f.question ?? f.q ?? "",
    answer: f.answer ?? f.a ?? "",
  }));
}

function normalizeProcessSteps(
  steps: { step?: number; title: string; description: string }[],
) {
  return steps.map((s, i) => ({
    step: s.step ?? i + 1,
    title: s.title,
    description: s.description,
  }));
}

export async function listPublic(_req: Request, res: Response) {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
  return sendSuccess(res, services);
}

export async function getBySlug(req: Request, res: Response) {
  const { slug } = req.params;
  const service = await prisma.service.findFirst({
    where: { slug, active: true },
  });

  if (!service) {
    return sendError(res, "Service not found", "NOT_FOUND", 404);
  }

  return sendSuccess(res, service);
}

export async function listAdmin(_req: Request, res: Response) {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return sendSuccess(res, services);
}

export async function create(req: Request, res: Response) {
  const body = req.body as {
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    startingPrice: string;
    includes?: string[];
    processSteps?: { step?: number; title: string; description: string }[];
    faqs?: { question?: string; answer?: string; q?: string; a?: string }[];
    order?: number;
    active?: boolean;
    slug?: string;
  };

  const slug =
    body.slug ??
    (await uniqueSlug(body.title, async (s) => {
      const existing = await prisma.service.findUnique({ where: { slug: s } });
      return !!existing;
    }));

  const service = await prisma.service.create({
    data: {
      slug,
      title: body.title,
      subtitle: body.subtitle,
      description: body.description,
      icon: body.icon,
      startingPrice: body.startingPrice,
      includes: body.includes ?? [],
      processSteps: normalizeProcessSteps(body.processSteps ?? []),
      faqs: normalizeFaqs(body.faqs ?? []),
      order: body.order ?? 0,
      active: body.active ?? true,
    },
  });

  return sendSuccess(res, service, 201);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const body = req.body as Partial<{
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    startingPrice: string;
    includes: string[];
    processSteps: { step?: number; title: string; description: string }[];
    faqs: { question?: string; answer?: string; q?: string; a?: string }[];
    order: number;
    active: boolean;
    slug: string;
  }>;

  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) {
    return sendError(res, "Service not found", "NOT_FOUND", 404);
  }

  let slug = body.slug;
  if (body.title && !body.slug) {
    slug = await uniqueSlug(body.title, async (s) => {
      const found = await prisma.service.findFirst({
        where: { slug: s, NOT: { id } },
      });
      return !!found;
    });
  }

  const service = await prisma.service.update({
    where: { id },
    data: {
      ...body,
      ...(slug && { slug }),
      ...(body.processSteps && {
        processSteps: normalizeProcessSteps(body.processSteps),
      }),
      ...(body.faqs && { faqs: normalizeFaqs(body.faqs) }),
    },
  });

  return sendSuccess(res, service);
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.service.delete({ where: { id } });
  return sendSuccess(res, { message: "Deleted successfully" });
}

export async function reorder(req: Request, res: Response) {
  const { items } = req.body as { items: { id: string; order: number }[] };

  await prisma.$transaction(
    items.map((item) =>
      prisma.service.update({
        where: { id: item.id },
        data: { order: item.order },
      }),
    ),
  );

  return sendSuccess(res, { message: "Order updated" });
}
