import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import * as controller from "./contact.controller";
import {
  listContactQuerySchema,
  submitContactSchema,
  updateContactSchema,
} from "./contact.schema";

const router = Router();

const contactSubmitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many contact submissions", code: "RATE_LIMITED" },
});

router.post("/", contactSubmitLimiter, validate(submitContactSchema), controller.submit);

router.get("/", requireAuth, validate(listContactQuerySchema, "query"), controller.list);
router.get("/:id", requireAuth, controller.getById);
router.put("/:id", requireAuth, validate(updateContactSchema), controller.update);
router.delete("/:id", requireAuth, controller.remove);

export default router;
