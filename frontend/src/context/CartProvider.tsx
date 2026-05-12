import { useState, type ReactNode } from "react";
import { CartContext } from "./cart.context";
import type { Product, CartItemType } from "../types/product.types"; // Importa ambos

interface Props {
    children: ReactNode;
}

export const CartProvider = ({ children }: Props) => {

    const [items, setItems] = useState<CartItemType[]>([]);

    //Función para añadir producto
    const addItem = (product: Product) => {
        setItems((prev) => {
            const isItemInCart = prev.find((item) => item.id === product.id);

            if (isItemInCart) {
                //Si ya existe, solo aumentamos la cantidad
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            //Si es nuevo, le agregamos la propiedad quantity: 1
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    //Funcion para sumar o restar desde el carrito (sumamos o restamos dependiendo del parametro que pasemos)
    const updateQuantity = (id: number, action: 'increment' | 'decrement') => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQuantity = action === 'increment'
                        ? item.quantity + 1
                        : item.quantity - 1;

                    // No permitimos que la cantidad sea menor a 1
                    return { ...item, quantity: Math.max(1, newQuantity) };
                }
                return item;
            })
        );
    };

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};