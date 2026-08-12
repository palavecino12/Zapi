import { Router } from "express";
import { createCheckout } from "./controller";
import { validate } from "../../middlewares/validateZodSchema";
import { checkoutSchema } from "../../schemas/checkoutSchema";

const router = Router();

router.post("/checkout", validate(checkoutSchema), createCheckout);

export default router;