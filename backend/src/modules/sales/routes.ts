import { Router } from "express";
import { createCheckout } from "./controller";

const router = Router();

router.post("/checkout", createCheckout);

export default router;