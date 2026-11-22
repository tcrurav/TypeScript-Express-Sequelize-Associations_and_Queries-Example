import { Router } from "express";
import brandWebRouter from "../modules/brands/brand.web.routes.js";

const router = Router();

router.use("/brands", brandWebRouter);

export default router;