import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";
import { CreatePaymentDTO } from "./types";

export const createPayment = (data: CreatePaymentDTO, tx: Prisma.TransactionClient = prisma) => {
    return tx.payment.create({
        data
    });
};

export const findPaymentByProviderId = (providerPaymentId: string) => {
    return prisma.payment.findUnique({
        where: { providerPaymentId }
    })
}