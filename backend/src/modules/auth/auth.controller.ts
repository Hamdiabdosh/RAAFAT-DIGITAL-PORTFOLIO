import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { signToken } from "../../utils/jwt";
import { sendError, sendSuccess } from "../../utils/response";

const BCRYPT_ROUNDS = 12;

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return sendError(res, "Invalid email or password", "INVALID_CREDENTIALS", 401);
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return sendError(res, "Invalid email or password", "INVALID_CREDENTIALS", 401);
  }

  const token = signToken({ sub: admin.id, email: admin.email });
  return sendSuccess(res, {
    token,
    admin: { id: admin.id, email: admin.email, name: admin.name },
  });
}

export async function me(req: Request, res: Response) {
  const admin = await prisma.admin.findUnique({
    where: { id: req.admin!.id },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  if (!admin) {
    return sendError(res, "Admin not found", "NOT_FOUND", 404);
  }

  return sendSuccess(res, admin);
}

export async function changePassword(req: Request, res: Response) {
  const { currentPassword, newPassword } = req.body as {
    currentPassword: string;
    newPassword: string;
  };

  const admin = await prisma.admin.findUnique({ where: { id: req.admin!.id } });
  if (!admin) {
    return sendError(res, "Admin not found", "NOT_FOUND", 404);
  }

  const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!valid) {
    return sendError(res, "Current password is incorrect", "INVALID_CREDENTIALS", 401);
  }

  const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  await prisma.admin.update({
    where: { id: admin.id },
    data: { passwordHash },
  });

  return sendSuccess(res, { message: "Password updated successfully" });
}

export async function updateProfile(req: Request, res: Response) {
  const { name, email } = req.body as { name?: string; email?: string };

  const admin = await prisma.admin.update({
    where: { id: req.admin!.id },
    data: {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
    },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  return sendSuccess(res, admin);
}
