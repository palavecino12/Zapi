import prisma from "../../config/prisma";
import { CreatePaymentDTO } from "./types";

export const createPayment = (data: CreatePaymentDTO) => {
    return prisma.payment.create({
        data
    });
};

export const findPaymentByProviderId = (providerPaymentId: string) => {
    return prisma.payment.findUnique({
        where: { providerPaymentId }
    })
}