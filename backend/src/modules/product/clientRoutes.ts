import { Router } from "express";

import * as productController from "./controller";
import { validate } from "../../middlewares/validateZodSchema";
import { productCodeSchema } from "../../schemas/productCodeSchema";

const router = Router();

// GET /products
router.get("/", productController.getProductsController);

// GET /products/:code
router.get("/:code", validate(productCodeSchema, "params"), productController.getProductByCodeController);

export default router;