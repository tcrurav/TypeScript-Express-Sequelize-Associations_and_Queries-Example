import { Router } from "express";
import { OrderController } from "./order.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("orders:read"), OrderController.getAll);

router.get("/customers/:id", authorize("orders:read"), OrderController.getByCustomerId);

router.get("/:id", authorize("orders:read"), OrderController.getById);

router.post("/", authorize("orders:create"), OrderController.create);

router.put("/:id", authorize("orders:update"), OrderController.update);

router.delete("/:id", authorize("orders:delete"), OrderController.delete);

export default router;