//Controlador encargado de crear una preferencia de pago y devolver la URL de checkout de Mercado Pago al frontend
import { NextFunction, Request, Response } from "express";
import * as saleService from "./service"

export const createCheckout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cart } = req.body;
        const initPoint = await saleService.createCheckout(cart);
        return res.json({ url: initPoint });
    } catch (error) {
        next(error)
    }
};

export const getStatistics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const statistics = await saleService.getStatistics();
        return res.json(statistics);
    } catch (error) {
        next(error)
    }
};
