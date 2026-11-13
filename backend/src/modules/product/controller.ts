//En este archivo recibimos las req del cliente, llamamos al service, manejamos los errores y retornamos res
import { NextFunction, Request, Response } from "express";
import * as productService from "./service";

//CONTROLLERS PARA EL CLIENTE

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
export const getProductByCodeController = async (req: Request<{ code: string }>, res: Response, next: NextFunction) => {
    try {
        const { code } = req.params;
        const product = await productService.getProductByCode(code);
        return res.status(200).json(product);
    } catch (error) {
        next(error)
    }
};

//CONTROLLERS PARA EL ADMINISTRADOR

//PATCH /products/:code/stock
export const addStockController = async (req: Request<{ code: string }>, res: Response, next: NextFunction) => {
    try {
        const { code } = req.params;
        const { quantity } = req.body;

        const product = await productService.addStockService(code, quantity);

        return res.status(200).json({
            message: "Stock actualizado correctamente",
            product
        });

    } catch (error) {
        next(error);
    }
};

//GET/products/all (Trae todos los productos)
export const getAllProductsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getAllProductsService();

        return res.status(200).json(products);

    } catch (error) {
        next(error);
    }
};

//GET /products/inactive (Trae los productos inactivos)
export const getInactiveProductsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getInactiveProductsService();

        return res.status(200).json(products);

    } catch (error) {
        next(error);
    }
};

//POST/products/ (Crea un producto)
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

//PATCH /products/:code (Oculta un producto, lo pone como inactivo).
export const hideProductController = async (req: Request<{ code: string }>, res: Response, next: NextFunction) => {
    try {
        const { code } = req.params;

        const hiddenProduct = await productService.hideProductService(code);

        return res.status(200).json({
            message: "Producto ocultado correctamente",
            product: hiddenProduct,
        });

    } catch (error) {
        next(error);
    }
};

//PUT /products/:code (Actualiza el nombre y precio de un producto)
export const updateProductController = async (req: Request<{ code: string }>, res: Response, next: NextFunction) => {
    try {
        const { code } = req.params
        const { name, price } = req.body

        const updatedProduct = await productService.updateProductService(code, name, price)

        return res.status(200).json({
            message: "Producto editado con éxito",
            product: updatedProduct
        })
    } catch (error) {
        next(error)
    }
}

//PATCH /products/:code/restore (Recupera un producto)
export const restoreProductController = async (req: Request<{ code: string }>, res: Response, next: NextFunction) => {
    try {
        const { code } = req.params;

        const restoredProduct = await productService.restoreProductService(code);

        return res.status(200).json({
            message: "Producto recuperado correctamente",
            product: restoredProduct
        });

    } catch (error) {
        next(error);
    }
};