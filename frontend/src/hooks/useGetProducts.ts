
import { useState, useEffect } from "react";
import type { Product } from "../types/productType";

//Este es un hook reutilizable, le tengo que pasar el service necesario.
//Son 3 tipos de service los que acepta: getProducts, getProducts y getProducts.

type GetProductsFunction = () => Promise<Product[]>;

export const useGetProducts = (getProductsFn: GetProductsFunction) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [refresh, setRefresh] = useState(false);

    const refreshProducts = () => {
        setRefresh(prev => !prev);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getProductsFn();
                setProducts(data);
            } catch (error) {
                const message = error instanceof Error? error.message: "Error al obtener los productos";

                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [refresh, getProductsFn]);

    return { products, loading, error, refreshProducts };
};
