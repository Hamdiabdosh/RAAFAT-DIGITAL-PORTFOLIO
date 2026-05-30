import type { Request, Response } from "express";
import { ProjectCategory, type Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { deleteMediaFile } from "../../utils/media";
import { uniqueSlug } from "../../utils/slug";
import { sendError, sendSuccess, sendSuccessList } from "../../utils/response";

export async function listPublic(req: Request, res: Response) {
  const { category, featured, limit } = req.query as unknown as {
    category?: ProjectCategory;
    featured?: boolean;
    limit?: number;
  };

  const where: Prisma.ProjectWhereInput = {
    published: true,
    ...(category && { category }),
    ...(featured !== undefined && { featured }),
  };

  const projects = await prisma.project.findMany({
    where,
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    ...(limit && { take: limit }),
  });

  return sendSuccess(res, projects);
}

export async function getBySlug(req: Request, res: Response) {
  const { slug } = req.params;
  const project = await prisma.project.findFirst({
    where: { slug, published: true },
  });

  if (!project) {
    return sendError(res, "Project not found", "NOT_FOUND", 404);
  }

  return sendSuccess(res, project);
}

export async function listAdmin(req: Request, res: Response) {
  const { page, limit, published } = req.query as unknown as {
    page: number;
    limit: number;
    published?: boolean;
  };

  const where: Prisma.ProjectWhereInput =
    published !== undefined ? { published } : {};
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      skip,
      take: limit,
    }),
    prisma.project.count({ where }),
  ]);

  return sendSuccessList(res, items, { total, page, limit });
}

export async function create(req: Request, res: Response) {
  const body = req.body as Prisma.ProjectCreateInput & { title: string; slug?: string };

  const slug = body.slug
    ? body.slug
    : await uniqueSlug(body.title, async (s) => {
        const existing = await prisma.project.findUnique({ where: { slug: s } });
        return !!existing;
      });

  const project = await prisma.project.create({
    data: {
      slug,
      title: body.title,
      client: body.client,
      clientType: body.clientType,
      category: body.category as ProjectCategory,
      description: body.description,
      challenge: body.challenge,
      solution: body.solution,
      result: body.result,
      technologies: body.technologies ?? [],
      features: body.features ?? [],
      timeline: body.timeline,
      coverImage: body.coverImage ?? null,
      images: body.images ?? [],
      liveUrl: body.liveUrl || null,
      githubUrl: body.githubUrl || null,
      videoUrl: body.videoUrl || null,
      technicalNotes: body.technicalNotes ?? null,
      architectureImage: body.architectureImage ?? null,
      nextSteps: body.nextSteps ?? null,
      metrics: body.metrics ?? undefined,
      featured: body.featured ?? false,
      published: body.published ?? true,
      order: body.order ?? 0,
    },
  });

  return sendSuccess(res, project, 201);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const body = req.body as Partial<Prisma.ProjectUpdateInput> & {
    title?: string;
    slug?: string;
  };

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    return sendError(res, "Project not found", "NOT_FOUND", 404);
  }

  let slug = body.slug;
  if (body.title && !body.slug) {
    slug = await uniqueSlug(body.title as string, async (s) => {
      const found = await prisma.project.findFirst({
        where: { slug: s, NOT: { id } },
      });
      return !!found;
    });
  }

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...body,
      ...(slug && { slug }),
    },
  });

  return sendSuccess(res, project);
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    return sendError(res, "Project not found", "NOT_FOUND", 404);
  }

  await deleteMediaFile(project.coverImage);
  await deleteMediaFile(project.architectureImage);
  await Promise.all(project.images.map((img) => deleteMediaFile(img)));

  await prisma.project.delete({ where: { id } });
  return sendSuccess(res, { message: "Deleted successfully" });
}

export async function reorder(req: Request, res: Response) {
  const { items } = req.body as { items: { id: string; order: number }[] };

  await prisma.$transaction(
    items.map((item) =>
      prisma.project.update({
        where: { id: item.id },
        data: { order: item.order },
      }),
    ),
  );

  return sendSuccess(res, { message: "Order updated" });
}
