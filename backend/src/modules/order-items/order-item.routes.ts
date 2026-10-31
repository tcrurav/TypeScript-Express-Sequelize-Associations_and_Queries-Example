import { Router } from "express";
import { OrderItemController } from "./order-item.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", OrderItemController.getAll);

router.get("/:id", OrderItemController.getById);

router.post("/", OrderItemController.create);

router.put("/:id", OrderItemController.update);

router.delete("/:id", OrderItemController.delete);

export default router;