
import { Router } from "express";

import { loginController } from "./controller";
import { validate } from "../../middlewares/validateZodSchema";
import { loginSchema } from "../../schemas/loginSchema";

const router = Router();

router.post("/login",validate(loginSchema),loginController);

export default router;
