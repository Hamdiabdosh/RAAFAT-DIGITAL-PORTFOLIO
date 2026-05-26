import { Router } from "express";
import { validate } from "../../middleware/validate";
import * as controller from "./blog.controller";
import {
  createBlogSchema,
  listAdminBlogQuerySchema,
  listBlogQuerySchema,
  updateBlogSchema,
} from "./blog.schema";

const publicRouter = Router();

publicRouter.get("/", validate(listBlogQuerySchema, "query"), controller.listPublic);
publicRouter.get("/:slug", controller.getBySlug);

const adminRouter = Router();

adminRouter.get("/", validate(listAdminBlogQuerySchema, "query"), controller.listAdmin);
adminRouter.post("/", validate(createBlogSchema), controller.create);
adminRouter.put("/:id", validate(updateBlogSchema), controller.update);
adminRouter.delete("/:id", controller.remove);

export { publicRouter as blogPublicRouter, adminRouter as blogAdminRouter };
