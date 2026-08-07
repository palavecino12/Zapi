//Servicio encargado de crear una preferencia de pago utilizando la SDK de Mercado Pago
import client from "../../config/mercadopago";
import { Payment } from "mercadopago";
import { Preference } from "mercadopago";
import { MercadoPagoItem } from "./types";

export const createPaymentPreference = async (saleId: number, items: MercadoPagoItem[]) => {

    const preference = new Preference(client);

    const response = await preference.create({
        body: {
            items,
            external_reference: saleId.toString(),
            back_urls: {
                success: `${process.env.FRONTEND_URL}/success`,
                failure: `${process.env.FRONTEND_URL}/error`,
                pending: "",
            },
            auto_return: undefined,
            notification_url: `${process.env.BACKEND_URL}/payments/webhook`
        },
    });

    return response;
};

export const getPayment = async (paymentId: string) => {

    const payment = new Payment(client);

    return await payment.get({
        id: paymentId
    });
};