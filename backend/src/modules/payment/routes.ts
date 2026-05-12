import { Router } from "express";
import { createPayment } from "./controller";

const router = Router();

router.post("/create", createPayment);

export default router;