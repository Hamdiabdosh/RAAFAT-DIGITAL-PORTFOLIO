import { Router } from "express";
import { validate } from "../../middleware/validate";
import * as controller from "./testimonials.controller";
import {
  createTestimonialSchema,
  listTestimonialsQuerySchema,
  updateTestimonialSchema,
} from "./testimonials.schema";

const publicRouter = Router();

publicRouter.get(
  "/",
  validate(listTestimonialsQuerySchema, "query"),
  controller.listPublic,
);

const adminRouter = Router();

adminRouter.get("/", controller.listAdmin);
adminRouter.post("/", validate(createTestimonialSchema), controller.create);
adminRouter.put("/:id", validate(updateTestimonialSchema), controller.update);
adminRouter.delete("/:id", controller.remove);

export { publicRouter as testimonialsPublicRouter, adminRouter as testimonialsAdminRouter };
