import { Router } from "express";
import * as productController from "./controller";
import { validate } from "../../middlewares/validateZodSchema";
import { productCodeSchema } from "../../schemas/productCodeSchema";
import { createProductSchema } from "../../schemas/createProductSchema";

const router = Router();

//GET/products/
router.get("/", productController.getProductsController);

//GET/products/:code
router.get("/:code", validate(productCodeSchema, "params"), productController.getProductByIdCodeController);

//POST/products
//hace falta la validacion por zod
router.post("/", validate(createProductSchema, "body"), productController.createProductController)

//DELETE/products/:code
router.delete("/:code", validate(productCodeSchema, "params"), productController.deleteProductController);

export default router;