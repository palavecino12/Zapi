//Type del producto tal como lo recibimos del back
export interface Product {
    id: number;
    code: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    createdAt: string;
}

//Type de los valores que va a introducir el admin al momento de crear un producto
export type CreateProductDTO = Omit<Product, "id" | "createdAt">;

//Type que vamos a usar solo para el carrito
export type CartItemType = Product & {
    quantity: number;
}

//Type que usamos para el carrito al back para generar el pago
export interface PaymentItem {
    productId: number;
    quantity: number;
}