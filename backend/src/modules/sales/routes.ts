import { Router } from "express";
import { createCheckout, getStatistics, getSalesHistory } from "./controller";
import { validate } from "../../middlewares/validateZodSchema";
import { checkoutSchema } from "../../schemas/checkoutSchema";

const router = Router();

router.post("/checkout", validate(checkoutSchema), createCheckout);
router.get("/statistics", getStatistics);
router.get("/history", getSalesHistory);

export default router;