//Controlador encargado de crear una preferencia de pagoy devolver la URL de checkout de Mercado Pago al frontend
import { Request, Response } from "express";
import { createPaymentPreference } from "./service";
import { type CreatePaymentBody } from "./types"

export const createPayment = async (req: Request, res: Response) => {

    try {
        //Recibimos solo el id y quantity de los productos (por seguridad)
        const { items }: CreatePaymentBody = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "El carrito está vacío."
            });
        }

        const initPoint = await createPaymentPreference(items);
        res.json({ url: initPoint });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Error creando pago" });

    }
};