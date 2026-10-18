import { Router } from "express";
import { createCheckout } from "./controller";
import { validate } from "../../middlewares/validateZodSchema";
import { checkoutSchema } from "../../schemas/checkoutSchema";
import { getStatistics } from "./service";

const router = Router();

router.post("/checkout", validate(checkoutSchema), createCheckout);
router.get("/statistics", getStatistics);

export default router;
