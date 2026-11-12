// Type que usamos para enviar los productos al back al generar el pago.
export interface PaymentItem {
    productId: number;
    quantity: number;
}