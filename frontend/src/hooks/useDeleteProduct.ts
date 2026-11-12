
import { useState } from "react";
import { deleteProductByCode } from "../services/productServices";
import type { ProductApiResponse } from "../types/apiResponseType";

export const useDeleteProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteProduct = async (code: string): Promise<ProductApiResponse | null> => {

        setLoading(true);
        setError(null);

        try {
            const response = await deleteProductByCode(code);

            return response;

        } catch (error) {
            const message = error instanceof Error ? error.message : "Lo sentimos, tuvimos un problema al desactivar el producto";

            setError(message);

            return null;

        } finally {
            setLoading(false);
        }
    };

    return { deleteProduct, loading, error };
};
