import { Router } from "express";
import bicycleRoutes from "../modules/bicycles/bicycle.routes";

const router = Router();

router.use("/bicycles", bicycleRoutes);

export default router;