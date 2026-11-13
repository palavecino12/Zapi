import { useState } from "react";
import type { ProductApiResponse } from "../../products/types/apiResponseType";
import { addStock } from "../services/stockService";

export const useAddStock = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addProductStock = async (code: string, quantity: number): Promise<ProductApiResponse | null> => {

        setLoading(true);
        setError(null);

        try {
            const response = await addStock(code, quantity);
            return response;

        } catch (error) {
            const message = error instanceof Error? error.message: "Lo sentimos, tuvimos un problema al agregar stock";

            setError(message);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { addProductStock, loading, error };
};