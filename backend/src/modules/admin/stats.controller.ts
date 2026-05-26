import type { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { sendSuccess } from "../../utils/response";

export async function getStats(_req: Request, res: Response) {
  const [
    messagesTotal,
    messagesUnread,
    projectsTotal,
    projectsPublished,
    blogTotal,
    blogPublished,
    testimonialsTotal,
  ] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: "UNREAD" } }),
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.testimonial.count(),
  ]);

  return sendSuccess(res, {
    messages: { total: messagesTotal, unread: messagesUnread },
    projects: { total: projectsTotal, published: projectsPublished },
    blog: {
      total: blogTotal,
      published: blogPublished,
      drafts: blogTotal - blogPublished,
    },
    testimonials: { total: testimonialsTotal },
  });
}
