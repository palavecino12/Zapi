import { useState } from "react"
import { deleteProductByCode, getProductByCode } from "../services/api.service"
import type { Product } from "../types/product.types"

export const useCart = () => {
    const [items, setItems] = useState<Product[]>([])
    const [total, setTotal] = useState<number>(0)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    //Funcion para añadir producto
    const addItem = async (code: string) => {
        try {
            setError(null)
            setLoading(true)

            const product = await getProductByCode(code) //esto se tendria que usar en la camara, no aca

            //Añadimos el producto al carrito
            setItems((prevItems) => [...prevItems, product]);
            //Actualizamos total
            setTotal((prevTotal) => prevTotal + product.price);

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocurrio un error inesperado");
            }
        } finally {
            setLoading(false)
        }
    }
    //Función para eliminar un producto
    const removeItem = async (code: string): Promise<void> => {
        try {
            setError(null);
            setLoading(true);

            const data = await deleteProductByCode(code);

            //Quitamos el producto del carrito
            setItems((prevItems) =>
                prevItems.filter(
                    (item) => item.code !== data.product.code
                )
            );
            //Actualizamos el total
            setTotal((prevTotal) =>
                prevTotal - data.product.price
            );

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocurrio un error inesperado");
            }
        } finally {
            setLoading(false);
        }
    };
    return { items, total, error, loading, addItem,removeItem }
}
