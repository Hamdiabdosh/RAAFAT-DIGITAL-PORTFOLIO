import fs from "fs";
import path from "path";
import type { Request, Response } from "express";
import { z } from "zod";
import { env } from "../../config/env";
import { sendError, sendSuccess } from "../../utils/response";

export async function uploadImages(req: Request, res: Response) {
  const files = req.files as Express.Multer.File[] | undefined;
  if (!files?.length) {
    return sendError(res, "No files uploaded", "VALIDATION_ERROR", 400);
  }

  const uploaded = files.map((file) => {
    const relative = path.relative(env.UPLOAD_DIR, file.path).replace(/\\/g, "/");
    const url = `/uploads/${relative}`;
    return {
      url,
      filename: file.filename,
      size: file.size,
    };
  });

  return sendSuccess(res, { files: uploaded }, 201);
}

const deleteSchema = z.object({ url: z.string().min(1) });

export async function deleteImage(req: Request, res: Response) {
  const parsed = deleteSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "URL is required", "VALIDATION_ERROR", 400);
  }

  const { url } = parsed.data;
  if (!url.startsWith("/uploads/")) {
    return sendError(res, "Invalid file URL", "VALIDATION_ERROR", 400);
  }

  const filePath = path.join(env.UPLOAD_DIR, url.replace("/uploads/", ""));
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return sendSuccess(res, { message: "File deleted" });
}
