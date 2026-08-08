import { Request, Response } from "express";
import * as paymentService from "./service";

export const Webhook = async (req: Request, res: Response) => {
    console.log("Webhook recibido");
    console.dir(req.body, { depth: null });

    const paymentId = req.body.data?.id;

    if (!paymentId) {
        return res.sendStatus(200);
    }

    try {
        console.log("Payment ID:", paymentId);

        const payment = await paymentService.getPayment(paymentId);

        console.log("PAYMENT OBTENIDO:");
        console.dir(payment, { depth: null });

        console.log("STATUS:", payment.status);
        console.log("SALE ID:", payment.external_reference);
        console.log("AMOUNT:", payment.transaction_amount);

    } catch (error) {
        console.log("ERROR AL CONSULTAR PAYMENT:");
        console.dir(error, { depth: null });
    }

    return res.sendStatus(200);
};