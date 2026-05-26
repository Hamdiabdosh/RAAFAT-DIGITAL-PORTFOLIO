import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { sendError } from "../utils/response";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return sendError(res, "Authentication required", "UNAUTHORIZED", 401);
  }

  const token = header.slice(7);
  try {
    const payload = verifyToken(token);
    req.admin = { ...payload, id: payload.sub };
    next();
  } catch {
    return sendError(res, "Invalid or expired token", "FORBIDDEN", 403);
  }
}
