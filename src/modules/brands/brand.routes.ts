import { Router } from "express";
import { BrandController } from "./brand.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", BrandController.getAll);

router.get("/:id", BrandController.getById);

router.post("/", BrandController.create);

router.put("/:id", BrandController.update);

router.delete("/:id", BrandController.delete);

export default router;