import { Router } from "express";

import * as productController from "./controller";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { adminMiddleware } from "../../middlewares/adminMiddleware";
import { validate } from "../../middlewares/validateZodSchema";

import { productCodeSchema } from "../../schemas/productCodeSchema";
import { createProductSchema } from "../../schemas/createProductSchema";
import { updateProductSchema } from "../../schemas/updateProductSchema";
import { addStockSchema } from "../../schemas/addStockSchema";
import { reviewStockSchema } from "../../schemas/reviewStockSchema";

const router = Router();

//Aca van a estar todos los endpoint protegidos, solo se admite al admin

// GET /products/all
router.get("/all", authMiddleware, adminMiddleware, productController.getAllProductsController);

// GET /products/inactive
router.get("/inactive", authMiddleware, adminMiddleware, productController.getInactiveProductsController);

// POST /products
router.post("/", authMiddleware, adminMiddleware, validate(createProductSchema, "body"), productController.createProductController);

// PUT /products/:code
router.put("/:code", authMiddleware, adminMiddleware, validate(productCodeSchema, "params"), validate(updateProductSchema), productController.updateProductController);

// PATCH /products/:code
router.patch("/:code", authMiddleware, adminMiddleware, validate(productCodeSchema, "params"), productController.hideProductController);

// PATCH /products/:code/restore
router.patch("/:code/restore", authMiddleware, adminMiddleware, validate(productCodeSchema, "params"), productController.restoreProductController);

// PATCH /products/:code/stock
router.patch("/:code/stock", authMiddleware, adminMiddleware, validate(productCodeSchema, "params"), validate(addStockSchema), productController.addStockController);

// POST /products/review-stock
router.post("/review-stock", authMiddleware, adminMiddleware, validate(reviewStockSchema, "body"), productController.reviewStockController);

export default router;