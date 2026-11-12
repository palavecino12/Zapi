import { type Product } from "../../products/types/productType";

// Type que vamos a usar solo para el carrito.
export type CartItemType = Product & {
    quantity: number;
};