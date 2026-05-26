import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { sendError } from "../utils/response";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    const message = err.errors.map((e) => e.message).join("; ");
    return sendError(res, message, "VALIDATION_ERROR", 400);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return sendError(res, "A record with this value already exists", "CONFLICT", 409);
    }
    if (err.code === "P2025") {
      return sendError(res, "Record not found", "NOT_FOUND", 404);
    }
  }

  if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
    return sendError(res, "Invalid or expired token", "UNAUTHORIZED", 401);
  }

  console.error(err);
  const message =
    env.NODE_ENV === "production"
      ? "Internal server error"
      : err instanceof Error
        ? err.message
        : "Internal server error";

  return sendError(res, message, "INTERNAL_ERROR", 500);
}
