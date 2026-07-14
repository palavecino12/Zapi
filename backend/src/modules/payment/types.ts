export interface PaymentItem {
    id: number;
    quantity: number;
}

//Este es el type del carrito que vamos a recibir del front cuando querramos crear el pago
export interface CreatePaymentBody {
    items: PaymentItem[];
}