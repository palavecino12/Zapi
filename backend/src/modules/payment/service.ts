import client from "../../config/mercadopago";
import { Payment } from "mercadopago";
import { Preference } from "mercadopago";
import { MercadoPagoItem } from "./types";
import * as saleRepository from "../sales/repository"
import * as paymentRepository from "./repository"
import * as productRepository from "../product/repository"
import { SaleStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../../config/prisma";
import { AppError } from "../../errors/AppError";

//Crea una preferencia donde usamos la url que nos devuelve para redirigir al usuario.
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
                pending: `${process.env.FRONTEND_URL}/loading`,
            },
            auto_return: "approved",
            //Mercado pago enviara las notificaciones de los eventos del pago a este endpoint.
            notification_url: `${process.env.BACKEND_URL}/payments/webhook`
        },
    });

    return response;
};

//Consulta a mercado pago la información completa del pago
export const getPayment = async (paymentId: string) => {

    const payment = new Payment(client);
    return await payment.get({ id: paymentId });
};

//Funcion para completar el pago. (PRINCIPAL)
export const processPayment = async (paymentId: string) => {

    //Trae el payment desde mercado pago.
    const payment = await getPayment(paymentId);

    //Valida que el pago este aprobado para continuar.
    if (payment.status !== "approved") {
        return;
    }

    //Verifica si este pago ya fue procesado para no almacenar dos pagos iguales.
    const existingPayment = await paymentRepository.findPaymentByProviderId(
        String(payment.id)
    );
    if (existingPayment) {
        return;
    }

    //Obtiene nuestra Sale para poder modificar el estado.
    //En el sale tambien obtenemos los items.
    const saleId = Number(payment.external_reference);
    const sale = await saleRepository.findSaleById(saleId);
    if (!sale) {
        throw new AppError("Venta no encontrada", 404);
    }

    if (sale.status === SaleStatus.PAID) {
        return;
    }

    //Asegura que el monto que pago el usuario es el mismo que tenia el sale. (seria raro que falle)
    if (
        payment.transaction_amount === undefined ||
        payment.transaction_amount !== sale.total.toNumber()
    ) {
        throw new AppError("El monto del pago no coincide con el total de la venta");
    }

    try {
        //Creamos una transaccion para garantizar que la actualizacion de la sale
        //y la creacion del payment se realicen de forma atomica.
        //Si alguna operacion falla se revierten los cambios realizados.
        await prisma.$transaction(async (tx) => {

            //Descuenta el stock de cada producto.
            for (const item of sale.items) {
                const result = await productRepository.decreaseStock(item.productId, item.quantity, tx)
                if (result.count === 0) {
                    throw new AppError("Stock insuficiente para completar la venta", 409);
                }
            }

            //Actualiza el estado del sale a PAID.
            await saleRepository.updateSaleStatus(sale.id, SaleStatus.PAID, tx);

            //Crea el payment.
            await paymentRepository.createPayment(
                {
                    providerPaymentId: String(payment.id),
                    amount: new Decimal(payment.transaction_amount!),
                    paymentMethod: payment.payment_method_id ?? null,
                    saleId: saleId
                },
                tx
            );

        });

    } catch (error: any) {
        //Prisma devuelve el error P2002 cuando se intenta insertar un providerPaymentId que ya existe. En ese caso, significa
        //que otro webhook ya procesó este pago, por lo que simplemente ignoramos el error.
        if (error.code === "P2002") {
            return;
        }

        throw error;
    }
};
