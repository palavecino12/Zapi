import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";
import { CreatePaymentDTO } from "./types";

//Crea un pago.
export const createPayment = (data: CreatePaymentDTO, tx: Prisma.TransactionClient = prisma) => {
    return tx.payment.create({
        data
    });
};

//Busca un pago a traves del id que nos da mercado pago.
export const findPaymentByProviderId = (providerPaymentId: string) => {
    return prisma.payment.findUnique({
        where: { providerPaymentId }
    })
}