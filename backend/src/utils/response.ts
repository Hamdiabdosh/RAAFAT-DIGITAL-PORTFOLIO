import type { Response } from "express";

export function sendSuccess<T>(res: Response, data: T, status = 200) {
  return res.status(status).json({ success: true, data });
}

export function sendSuccessList<T>(
  res: Response,
  data: T[],
  meta: { total: number; page: number; limit: number; [key: string]: unknown },
) {
  return res.json({ success: true, data, meta });
}

export function sendError(
  res: Response,
  error: string,
  code: string,
  status: number,
) {
  return res.status(status).json({ success: false, error, code });
}
