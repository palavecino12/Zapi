import { Router } from "express";
import { getProductByIdCodeController, deleteProductController, getProductsController } from "./controller";
import { validate } from "../../middlewares/validateZodSchema";
import { productCodeSchema } from "../../schemas/productCodeSchema";

const router = Router();

//GET/products/
router.get("/", getProductsController);

//GET/products/:code
router.get("/:code", validate(productCodeSchema, "params"), getProductByIdCodeController);

//DELETE/products/:code
router.delete("/:code", validate(productCodeSchema, "params"), deleteProductController);

export default router;