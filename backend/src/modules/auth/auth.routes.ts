import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { extractBasicAuthHeader } from "../../middlewares/basic-auth-middleware.js";

const router = Router();

router.post("/login", extractBasicAuthHeader, AuthController.login);

router.post("/register", extractBasicAuthHeader, AuthController.register);

export default router;