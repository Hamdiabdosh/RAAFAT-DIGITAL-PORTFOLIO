import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../config/prisma";
import { sendSuccess } from "../../utils/response";

const updateSettingsSchema = z.object({
  settings: z.array(
    z.object({
      key: z.string().min(1),
      value: z.string(),
    }),
  ),
});

export async function getSettings(_req: Request, res: Response) {
  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return sendSuccess(res, map);
}

export async function updateSettings(req: Request, res: Response) {
  const { settings } = updateSettingsSchema.parse(req.body);

  await prisma.$transaction(
    settings.map((s) =>
      prisma.siteSetting.upsert({
        where: { key: s.key },
        create: { key: s.key, value: s.value },
        update: { value: s.value },
      }),
    ),
  );

  const updated = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });
  const map = Object.fromEntries(updated.map((s) => [s.key, s.value]));
  return sendSuccess(res, map);
}
