//Servicio encargado de crear una preferencia de pago utilizando la SDK de Mercado Pago
import client from "../../config/mercadopago";
import { Payment } from "mercadopago";
import { Preference } from "mercadopago";
import { MercadoPagoItem } from "./types";
import * as saleRepository from "../sales/repository"
import * as paymentRepository from "./repository"
import { SaleStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export const createPaymentPreference = async (saleId: number, items: MercadoPagoItem[]) => {

    const preference = new Preference(client);

    const response = await preference.create({
        body: {
            items,
            //Relaciona la operación de mercado pago con nuestra sale.
            external_reference: saleId.toString(),
            back_urls: {
                success: `${process.env.FRONTEND_URL}/success`,
                failure: `${process.env.FRONTEND_URL}/error`,
                pending: "",
            },
            auto_return: undefined,
            //Mercado pago enviará las notificaciones de los eventos del pago a este endpoint.
            notification_url: `${process.env.BACKEND_URL}/payments/webhook`
        },
    });

    return response;
};

export const getPayment = async (paymentId: string) => {

    const payment = new Payment(client);

    //Consulta a mercado pago la información completa del pago
    return await payment.get({ id: paymentId });
};

//Funcion para completar el pago.
export const processPayment = async (paymentId: string) => {
    //Trae el payment con el id del pago que nos dio mp.
    const payment = await getPayment(paymentId);

    if (payment.status !== "approved") {
        return
    }

    //Verificamos si este pago ya fue procesado.
    const existingPayment = await paymentRepository.findPaymentByProviderId(String(payment.id));
    if (existingPayment) {
        return;
    }

    //Obtiene nuestro sale que creamos al momento de la venta.
    const saleId = Number(payment.external_reference)
    const sale = await saleRepository.findSaleById(saleId)

    if (!sale) {
        throw new Error("Venta no encontrada");
    }

    //Verificamos si la venta ya fue pagada.
    if (sale.status === SaleStatus.PAID) {
        return;
    }

    //Verificamos que el monto pagado coincida con el total de la venta. (seria muy raro que aca haya un problema)
    if (
        payment.transaction_amount === undefined ||
        payment.transaction_amount !== sale.total.toNumber()
    ) {
        console.error(
            `Monto incorrecto para Sale ${sale.id}. ` +
            `Esperado: ${sale.total.toNumber()}, ` +
            `Recibido: ${payment.transaction_amount}`
        );

        return;
    }

    //Actualiza el estado de la venta a aprovado
    await saleRepository.updateSaleStatus(sale.id, SaleStatus.PAID)

    //Adaptamos los datos de mp a los tipos del schema de prisma para crear el payment.
    await paymentRepository.createPayment({
        providerPaymentId: String(payment.id),
        amount: new Decimal(payment.transaction_amount!),
        paymentMethod: payment.payment_method_id ?? null,
        saleId: saleId
    })
}