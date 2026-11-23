
// Type que usamos para enviar los productos al back al generar el pago.
export interface PaymentItem {
    productId: number;
    quantity: number;
}

// Representa un producto dentro de una venta histórica.
export interface SaleHistoryItem {
    id: number;
    quantity: number;
    priceAtSale: string;
    product: {
        name: string;
    };
}

// Representa una venta individual.
export interface SaleHistory {
    id: number;
    total: string;
    status: "PAID";
    createdAt: string;
    items: SaleHistoryItem[];
    payment: {
        paymentMethod: string | null;
        createdAt: string;
    };
}

// Representa todas las ventas de un día.
export interface SaleHistoryDay {
    date: string;
    totalSales: number;
    totalAmount: number;
    sales: SaleHistory[];
}

// Respuesta completa del endpoint.
export interface SalesHistoryResponse {
    history: SaleHistoryDay[];
}
