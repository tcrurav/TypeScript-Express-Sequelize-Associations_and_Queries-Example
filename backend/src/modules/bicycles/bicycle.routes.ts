import { Router } from "express";
import { BicycleController } from "./bicycle.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("bicycles:read"), BicycleController.getAll);

router.get("/eagerly/frame-material/:frameMaterial", authorize("bicycles:read"),
    BicycleController.getAllEagerlyByFrameMaterial);

router.get("/:id", authorize("bicycles:read"), BicycleController.getById);

router.get("/eagerly/:id", authorize("bicycles:read"), BicycleController.getEagerlyById);

router.post("/", authorize("bicycles:create"), authorize("bicycles:create"),
    BicycleController.create);

router.put("/:id", authorize("bicycles:update"), BicycleController.update);

router.delete("/:id", authorize("bicycles:delete"), BicycleController.delete);

export default router;