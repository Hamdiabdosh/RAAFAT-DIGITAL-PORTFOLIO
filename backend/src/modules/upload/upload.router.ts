import { Router } from "express";
import { upload } from "../../middleware/upload";
import * as controller from "./upload.controller";

const router = Router();

router.post("/", upload.array("images", 5), controller.uploadImages);
router.delete("/", controller.deleteImage);

export default router;
