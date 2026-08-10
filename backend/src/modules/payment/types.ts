import { Payment } from "@prisma/client"

export interface MercadoPagoItem {
    id: string;
    title: string;
    quantity: number;
    unit_price: number;
    currency_id: "ARS";
}

export type CreatePaymentDTO = Omit<Payment, "id"| "createdAt">