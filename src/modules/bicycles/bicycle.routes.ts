import { Router } from "express";
import { BicycleController } from "./bicycle.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", BicycleController.getAll);

router.get("/eagerly/frame-material/:frameMaterial", BicycleController.getAllEagerlyByFrameMaterial);

router.get("/:id", BicycleController.getById);

router.get("/eagerly/:id", BicycleController.getEagerlyById);

router.post("/", BicycleController.create);

router.put("/:id", BicycleController.update);

router.delete("/:id", BicycleController.delete);

export default router;