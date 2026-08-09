import { Request, Response } from "express";
import * as paymentService from "./service";

export const Webhook = async (req: Request, res: Response) => {
    const paymentId = req.body.data?.id;

    if (!paymentId) {
        return res.sendStatus(200);
    }

    await paymentService.processPayment(paymentId);

    return res.sendStatus(200);
};