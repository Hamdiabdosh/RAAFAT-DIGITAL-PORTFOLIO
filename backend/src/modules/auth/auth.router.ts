import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import * as controller from "./auth.controller";
import { changePasswordSchema, loginSchema, updateProfileSchema } from "./auth.schema";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many login attempts", code: "RATE_LIMITED" },
});

router.post("/login", loginLimiter, validate(loginSchema), controller.login);
router.get("/me", requireAuth, controller.me);
router.put("/password", requireAuth, validate(changePasswordSchema), controller.changePassword);
router.put("/profile", requireAuth, validate(updateProfileSchema), controller.updateProfile);

export default router;
