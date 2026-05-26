import { Router } from "express";
import contactRouter from "../contact/contact.router";
import { blogAdminRouter } from "../blog/blog.router";
import { projectsAdminRouter } from "../projects/projects.router";
import { servicesAdminRouter } from "../services/services.router";
import { testimonialsAdminRouter } from "../testimonials/testimonials.router";
import uploadRouter from "../upload/upload.router";
import * as statsController from "./stats.controller";
import * as settingsController from "./settings.controller";

const router = Router();

router.use("/contact", contactRouter);
router.use("/projects", projectsAdminRouter);
router.use("/blog", blogAdminRouter);
router.use("/services", servicesAdminRouter);
router.use("/testimonials", testimonialsAdminRouter);
router.use("/upload", uploadRouter);
router.get("/stats", statsController.getStats);
router.get("/settings", settingsController.getSettings);
router.put("/settings", settingsController.updateSettings);

export default router;
