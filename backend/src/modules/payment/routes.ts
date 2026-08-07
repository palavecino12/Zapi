import { Router } from "express";
import { Webhook } from "./controller";

const router = Router()

router.post("webhook", Webhook)

export default router;