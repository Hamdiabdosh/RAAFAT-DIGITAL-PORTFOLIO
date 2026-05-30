import { Router } from "express";
import * as controller from "./upload.controller";

const router = Router();

router.delete("/", controller.deleteImage);

export default router;
