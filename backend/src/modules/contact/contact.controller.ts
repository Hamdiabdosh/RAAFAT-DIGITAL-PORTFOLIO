import type { Request, Response } from "express";
import { MessageStatus, type Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { sendError, sendSuccess, sendSuccessList } from "../../utils/response";
import { sendContactEmails } from "./contact.service";

export async function submit(req: Request, res: Response) {
  const body = req.body as {
    name: string;
    email: string;
    phone?: string;
    serviceInterest: string;
    budgetRange: string;
    description: string;
    hearAboutUs: string;
  };

  const message = await prisma.contactMessage.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      serviceInterest: body.serviceInterest,
      budgetRange: body.budgetRange,
      description: body.description,
      hearAboutUs: body.hearAboutUs,
    },
  });

  try {
    await sendContactEmails({
      ...body,
      createdAt: message.createdAt,
    });
  } catch (err) {
    console.error("Failed to send contact emails:", err);
  }

  return sendSuccess(res, { message: "Message sent successfully" }, 201);
}

export async function list(req: Request, res: Response) {
  const { page, limit, status } = req.query as unknown as {
    page: number;
    limit: number;
    status?: MessageStatus;
  };

  const where: Prisma.ContactMessageWhereInput = status ? { status } : {};
  const skip = (page - 1) * limit;

  const [items, total, unread] = await Promise.all([
    prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.contactMessage.count({ where }),
    prisma.contactMessage.count({ where: { status: "UNREAD" } }),
  ]);

  return sendSuccessList(res, items, { total, page, limit, unread });
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params;

  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) {
    return sendError(res, "Message not found", "NOT_FOUND", 404);
  }

  if (message.status === "UNREAD") {
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status: "READ" },
    });
    return sendSuccess(res, updated);
  }

  return sendSuccess(res, message);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const { status, notes } = req.body as { status?: MessageStatus; notes?: string };

  const message = await prisma.contactMessage.update({
    where: { id },
    data: {
      ...(status !== undefined && { status }),
      ...(notes !== undefined && { notes }),
    },
  });

  return sendSuccess(res, message);
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.contactMessage.delete({ where: { id } });
  return sendSuccess(res, { message: "Deleted successfully" });
}
