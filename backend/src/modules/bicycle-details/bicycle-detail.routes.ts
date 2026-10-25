import { Router } from "express";
import { BicycleDetailController } from "./bicycle-detail.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", BicycleDetailController.getAll);

router.get("/:id", BicycleDetailController.getById);

router.post("/", BicycleDetailController.create);

router.put("/:id", BicycleDetailController.update);

router.delete("/:id", BicycleDetailController.delete);

export default router;