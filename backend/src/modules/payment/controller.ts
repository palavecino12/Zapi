import { Request, Response } from "express";
import * as paymentService from "./service";

export const Webhook = async (req: Request, res: Response) => {
    console.log("Webhook recibido");
    console.dir(req.body, { depth: null });
    
    const paymentId = req.body.data?.id;

    if (!paymentId) {
        return res.sendStatus(200);
    }

    const payment = await paymentService.getPayment(paymentId);
    console.dir(payment, { depth: null });

    return res.sendStatus(200);
}