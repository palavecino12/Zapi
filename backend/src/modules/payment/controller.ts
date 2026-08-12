//Este controller recibe las notificaciones de mercado pago.
//Se utiliza para procesar y validar el estado del pago antes de continuar con el flujo.
import { Request, Response } from "express";
import * as paymentService from "./service";

export const Webhook = async (req: Request, res: Response) => {

    const paymentId = req.body.data?.id;

    if (!paymentId) {
        return res.sendStatus(200);
    }

    try {
        await paymentService.processPayment(paymentId);
    } catch (error) {
        //Registramos el error para poder investigarlo,
        //pero no se lo devolvemos a mercado pago.
        console.error("Error procesando pago:", error);
    }
    //Respondemos 200 para indicar que la notificacion fue recibida.
    return res.sendStatus(200);
};