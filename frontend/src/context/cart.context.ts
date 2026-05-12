import { createContext } from "react";
import type { CartItemType } from "../types/product.types";

export interface CartContextType {
    items: CartItemType[];
    addItem: (product: CartItemType) => void;
    removeItem: (id:number) => void;
    updateQuantity:(id:number,action:"increment"|"decrement")=>void
}

export const CartContext = createContext<CartContextType | null>(null);