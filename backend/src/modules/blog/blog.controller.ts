import type { Request, Response } from "express";
import { BlogCategory, type Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { uniqueSlug } from "../../utils/slug";
import { sendError, sendSuccess, sendSuccessList } from "../../utils/response";

export async function listPublic(req: Request, res: Response) {
  const { category, featured, page, limit, tag } = req.query as unknown as {
    category?: BlogCategory;
    featured?: boolean;
    page: number;
    limit: number;
    tag?: string;
  };

  const where: Prisma.BlogPostWhereInput = {
    published: true,
    ...(category && { category }),
    ...(featured !== undefined && { featured }),
    ...(tag && { tags: { has: tag } }),
  };

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return sendSuccessList(res, items, { total, page, limit });
}

export async function getBySlug(req: Request, res: Response) {
  const { slug } = req.params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, published: true },
  });

  if (!post) {
    return sendError(res, "Post not found", "NOT_FOUND", 404);
  }

  return sendSuccess(res, post);
}

export async function listAdmin(req: Request, res: Response) {
  const { page, limit, published } = req.query as unknown as {
    page: number;
    limit: number;
    published?: boolean;
  };

  const where: Prisma.BlogPostWhereInput =
    published !== undefined ? { published } : {};
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return sendSuccessList(res, items, { total, page, limit });
}

export async function create(req: Request, res: Response) {
  const body = req.body as {
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    category: BlogCategory;
    coverImage?: string | null;
    readTime: number;
    published?: boolean;
    featured?: boolean;
    tags?: string[];
    publishedAt?: Date | null;
  };

  const slug =
    body.slug ??
    (await uniqueSlug(body.title, async (s) => {
      const existing = await prisma.blogPost.findUnique({ where: { slug: s } });
      return !!existing;
    }));

  const published = body.published ?? false;
  const publishedAt =
    body.publishedAt ?? (published ? new Date() : null);

  const post = await prisma.blogPost.create({
    data: {
      slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      coverImage: body.coverImage ?? null,
      readTime: body.readTime,
      published,
      featured: body.featured ?? false,
      tags: body.tags ?? [],
      publishedAt,
    },
  });

  return sendSuccess(res, post, 201);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const body = req.body as Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: BlogCategory;
    coverImage: string | null;
    readTime: number;
    published: boolean;
    featured: boolean;
    tags: string[];
    publishedAt: Date | null;
  }>;

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) {
    return sendError(res, "Post not found", "NOT_FOUND", 404);
  }

  let slug = body.slug;
  if (body.title && !body.slug) {
    slug = await uniqueSlug(body.title, async (s) => {
      const found = await prisma.blogPost.findFirst({
        where: { slug: s, NOT: { id } },
      });
      return !!found;
    });
  }

  const publishing = body.published === true && !existing.published;
  const publishedAt =
    body.publishedAt !== undefined
      ? body.publishedAt
      : publishing
        ? new Date()
        : undefined;

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...body,
      ...(slug && { slug }),
      ...(publishedAt !== undefined && { publishedAt }),
    },
  });

  return sendSuccess(res, post);
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.blogPost.delete({ where: { id } });
  return sendSuccess(res, { message: "Deleted successfully" });
}
