//En este archivo recibimos las req del cliente, llamamos al service, manejamos los errores y retornamos res
import { NextFunction, Request, Response } from "express";
import { getProductByCode, deleteProductService, getProducts } from "./service";

//GET/products/
export const getProductsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getProducts();
        return res.status(200).json(products);
    } catch (error) {
        next(error)
    }
}

//GET/products/:code
export const getProductByCodeController = async (req: Request<{ code: string }>, res: Response, next: NextFunction) => {

    try {
        const { code } = req.params;
        const product = await getProductByCode(code);
        return res.status(200).json(product);
    } catch (error: unknown) {
        next(error)
    }
};

//DELETE/products/:code
export const deleteProductController = async (req: Request<{ code: string }>, res: Response, next: NextFunction) => {
    try {
        const { code } = req.params;

        const deletedProduct = await deleteProductService(code);

        return res.status(200).json({
            message: "Producto eliminado correctamente",
            product: deletedProduct,
        });

    } catch (error) {
        next(error);
    }
};