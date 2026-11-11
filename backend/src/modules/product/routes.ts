
import { Router } from "express";
import * as productController from "./controller";
import { validate } from "../../middlewares/validateZodSchema";
import { productCodeSchema } from "../../schemas/productCodeSchema";
import { createProductSchema } from "../../schemas/createProductSchema";
import { updateProductSchema } from "../../schemas/updateProductSchema";

const router = Router();

//GET/products/all (Trae todos los productos)
router.get("/all", productController.getAllProductsController);

//GET/products/inactive (Trae todos los productos inactivos)
router.get("/inactive", productController.getInactiveProductsController);

//GET/products/ (Trae los productos activos con stock)
router.get("/", productController.getProductsController);

//GET/products/:code (Busca un producto por código)
router.get("/:code", validate(productCodeSchema, "params"), productController.getProductByCodeController);

//POST/products (Crea un producto)
router.post("/", validate(createProductSchema, "body"), productController.createProductController);

//PUT/products/:code (Edita el nombre y precio)
router.put("/:code", validate(updateProductSchema), productController.updateProductController);

//DELETE/products/:code (Desactiva un producto)
router.delete("/:code", validate(productCodeSchema, "params"), productController.deleteProductController);

//PATCH/products/:code/restore (Recupera un producto)
router.patch("/:code/restore", validate(productCodeSchema, "params"), productController.restoreProductController);

export default router;
