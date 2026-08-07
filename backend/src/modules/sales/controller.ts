//Controlador encargado de crear una preferencia de pago y devolver la URL de checkout de Mercado Pago al frontend
import { Request, Response } from "express";
import { CreateSaleBodyDTO } from "./types";
import * as saleService from "./service"

export const createCheckout = async (req: Request, res: Response) => {

    try {
        //Recibimos solo el id y quantity de los productos (por seguridad)
        const { items }: CreateSaleBodyDTO = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({message: "El carrito está vacío."});
        }

        const initPoint = await saleService.createCheckout(items);
        res.json({ url: initPoint });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Error creando pago" });

    }
};