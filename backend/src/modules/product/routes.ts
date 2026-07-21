import { Router } from "express";
import {getProductByCodeController,deleteProductController, getProductsController} from "./controller";

const router = Router();

//GET/products/
router.get("/", getProductsController);

//GET/products/:code
router.get("/:code", getProductByCodeController);

//DELETE/products/:code
router.delete("/:code", deleteProductController);

export default router;