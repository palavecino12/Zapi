
import { Router } from "express";

import { getCurrentUserController, loginController } from "./controller";
import { validate } from "../../middlewares/validateZodSchema";
import { loginSchema } from "../../schemas/loginSchema";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/login",validate(loginSchema),loginController);
router.get("/me", authMiddleware, getCurrentUserController);

export default router;
