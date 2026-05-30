import type { Request, Response } from "express";
import { z } from "zod";
import { deleteMediaFile, isDeletableMediaUrl } from "../../utils/media";
import { sendError, sendSuccess } from "../../utils/response";

const deleteSchema = z.object({ url: z.string().min(1) });

export async function deleteImage(req: Request, res: Response) {
  const parsed = deleteSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "URL is required", "VALIDATION_ERROR", 400);
  }

  const { url } = parsed.data;
  if (!isDeletableMediaUrl(url)) {
    return sendError(res, "Invalid file URL", "VALIDATION_ERROR", 400);
  }

  try {
    await deleteMediaFile(url);
    return sendSuccess(res, { message: "File deleted" });
  } catch {
    return sendError(res, "Failed to delete file", "INTERNAL_ERROR", 500);
  }
}
