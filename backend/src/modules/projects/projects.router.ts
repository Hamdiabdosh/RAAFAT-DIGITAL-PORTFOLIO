import { Router } from "express";
import { validate } from "../../middleware/validate";
import * as controller from "./projects.controller";
import {
  createProjectSchema,
  listAdminProjectsQuerySchema,
  listProjectsQuerySchema,
  reorderProjectsSchema,
  updateProjectSchema,
} from "./projects.schema";

const publicRouter = Router();

publicRouter.get("/", validate(listProjectsQuerySchema, "query"), controller.listPublic);
publicRouter.get("/:slug", controller.getBySlug);

const adminRouter = Router();

adminRouter.get("/", validate(listAdminProjectsQuerySchema, "query"), controller.listAdmin);
adminRouter.post("/", validate(createProjectSchema), controller.create);
adminRouter.put("/reorder", validate(reorderProjectsSchema), controller.reorder);
adminRouter.put("/:id", validate(updateProjectSchema), controller.update);
adminRouter.delete("/:id", controller.remove);

export { publicRouter as projectsPublicRouter, adminRouter as projectsAdminRouter };
