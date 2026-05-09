import { Router } from "express";
import {getProductByCodeController,deleteProductController,} from "./controller";

const router = Router();

// GET /products/:code
router.get("/:code", getProductByCodeController);

// DELETE /products/:code
router.delete("/:code", deleteProductController);

export default router;