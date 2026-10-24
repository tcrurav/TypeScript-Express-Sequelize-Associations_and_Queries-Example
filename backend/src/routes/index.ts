import { Router } from "express";
import bicycleRoutes from "../modules/bicycles/bicycle.routes.js";
import brandRoutes from "../modules/brands/brand.routes.js";
import bicycleDetailRoutes from "../modules/bicycle-details/bicycle-detail.routes.js";
import customerRoutes from "../modules/customers/customer.routes.js";
import orderRoutes from "../modules/orders/order.routes.js";
import orderItemRoutes from "../modules/order-items/order-item.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";

const router = Router();

router.use("/bicycles", bicycleRoutes);
router.use("/brands", brandRoutes);
router.use("/bicycle-details", bicycleDetailRoutes);
router.use("/customers", customerRoutes);
router.use("/orders", orderRoutes);
router.use("/order-items", orderItemRoutes);

router.use("/auth", authRoutes);

export default router;