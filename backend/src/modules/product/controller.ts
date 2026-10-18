//En este archivo recibimos las req del cliente, llamamos al service, manejamos los errores y retornamos res
import { NextFunction, Request, Response } from "express";
import * as productService from "./service";

//GET/products/
export const getProductsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getProducts();
        return res.status(200).json(products);
    } catch (error) {
        next(error)
    }
}

//GET/products/:code
export const getProductByIdCodeController = async (req: Request<{ code: string }>, res: Response, next: NextFunction) => {

    try {
        const { code } = req.params;
        const product = await productService.getProductByCode(code);
        return res.status(200).json(product);
    } catch (error) {
        next(error)
    }
};

//CONTROLLERS PARA EL ADMINISTRADOR

//DELETE/products/:code
export const deleteProductController = async (req: Request<{ code: string }>, res: Response, next: NextFunction) => {
    try {
        const { code } = req.params;

        const deletedProduct = await productService.deleteProductService(code);

        return res.status(200).json({
            message: "Producto eliminado correctamente",
            product: deletedProduct,
        });

    } catch (error) {
        next(error);
    }
};

//POST/products/
export const createProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdProduct = await productService.createProductService(req.body);

        return res.status(201).json({
            message: "Producto creado con éxito",
            product: createdProduct
        });

    } catch (error) {
        next(error);
    }
};