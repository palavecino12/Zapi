//Este es el primer paso del context, es como crear un canal por donde vamos a compartir informacion.
import { createContext } from "react";
import type { Product, CartItemType } from "../types/product.types";

export interface CartContextType {
    items: CartItemType[];
    addItem: (product: Product) => void;
    removeItem: (id:number) => void;
    updateQuantity:(id:number,action:"increment"|"decrement")=>void
}

//Creamos un Context indicando que tipo de datos contendra. Mientras ningun Provider lo provea, su valor sera null.
export const CartContext = createContext<CartContextType | null>(null);