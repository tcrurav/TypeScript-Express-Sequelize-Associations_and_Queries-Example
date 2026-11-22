import { Router } from "express";

import { BrandWebController } from "./brand.web.controller.js";

const router = Router();

router.get("/", BrandWebController.index);

router.get("/create", BrandWebController.create);

router.post("/", BrandWebController.store);

router.get("/:id", BrandWebController.show);

router.get("/:id/edit", BrandWebController.edit);

router.post("/:id", BrandWebController.update);

router.post("/:id/delete", BrandWebController.destroy);

export default router;