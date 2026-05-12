//En este archivo recibimos las req del cliente, llamamos al service, manejamos los errores y retornamos res

import {Request,Response} from "express";
import {getProductByCodeService,deleteProductService} from "./service";
import { Product } from "@prisma/client";

//GET /products/:code
export const getProductByCodeController = async (req: Request, res: Response):Promise<Response> => {

    try {
        const { code } = req.params;

        if (!code || typeof code !== "string") {
            return res.status(400).json({
                message: "Codigo de producto invalido",
            });
        }

        const product = await getProductByCodeService(code);

        return res.status(200).json(product);
    } catch (error: any) {
        if (error.message === "El producto no fue encontrado") {
            return res.status(404).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

//DELETE /products/:code
export const deleteProductController = async (req: Request,res: Response):Promise<Response>  => {
    try {
        
        const { code } = req.params;

        if (!code || typeof code !== "string") {
            return res.status(400).json({
                message: "Codigo de producto invalido",
            });
        }

        const deletedProduct = await deleteProductService(code);

        return res.status(200).json({
            message: "Producto eliminado correctamente",
            product: deletedProduct,
        });
    } catch (error: any) {
        if (error.message === "El producto no existe") {
            return res.status(404).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};