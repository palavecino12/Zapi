//Controlador encargado de crear una preferencia de pagoy devolver la URL de checkout de Mercado Pago al frontend
import { Request, Response } from "express";
import { createPaymentPreference } from "./service";

export const createPayment = async (_req: Request, res: Response) => {

    try {
        const initPoint = await createPaymentPreference();
        res.json({ url: initPoint });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creando pago" });
    }
};