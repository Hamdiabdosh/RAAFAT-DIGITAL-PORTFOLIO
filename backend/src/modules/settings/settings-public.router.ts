import { Router } from "express";
import { prisma } from "../../config/prisma";
import { sendSuccess } from "../../utils/response";

const router = Router();

router.get("/", async (_req, res) => {
  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return sendSuccess(res, map);
});

export default router;
