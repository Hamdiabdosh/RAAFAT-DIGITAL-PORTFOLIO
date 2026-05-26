import { Router } from "express";
import { validate } from "../../middleware/validate";
import * as controller from "./services.controller";
import {
  createServiceSchema,
  reorderServicesSchema,
  updateServiceSchema,
} from "./services.schema";

const publicRouter = Router();

publicRouter.get("/", controller.listPublic);
publicRouter.get("/:slug", controller.getBySlug);

const adminRouter = Router();

adminRouter.get("/", controller.listAdmin);
adminRouter.post("/", validate(createServiceSchema), controller.create);
adminRouter.put("/reorder", validate(reorderServicesSchema), controller.reorder);
adminRouter.put("/:id", validate(updateServiceSchema), controller.update);
adminRouter.delete("/:id", controller.remove);

export { publicRouter as servicesPublicRouter, adminRouter as servicesAdminRouter };
