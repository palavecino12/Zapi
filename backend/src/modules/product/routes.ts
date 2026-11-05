import { Router } from "express";
import * as productController from "./controller";
import { validate } from "../../middlewares/validateZodSchema";
import { productCodeSchema } from "../../schemas/productCodeSchema";
import { createProductSchema } from "../../schemas/createProductSchema";
import { updateProductSchema } from "../../schemas/updateProductSchema";

const router = Router();

//GET/products/
router.get("/", productController.getProductsController);

//GET/products/:code
router.get("/:code", validate(productCodeSchema, "params"), productController.getProductByIdCodeController);

//POST/products
router.post("/", validate(createProductSchema, "body"), productController.createProductController)

//PUT/products/:code
router.put("/:code", validate(updateProductSchema), productController.updateProductController)

//DELETE/products/:code
router.delete("/:code", validate(productCodeSchema, "params"), productController.deleteProductController);

export default router;