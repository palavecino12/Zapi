
import { useState } from "react";
import { restoreProductByCode } from "../services/productServices";
import type { ProductApiResponse } from "../types/apiResponseType";

export const useRestoreProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const restoreProduct = async (code: string): Promise<ProductApiResponse | null> => {

        setLoading(true);
        setError(null);

        try {
            const response = await restoreProductByCode(code);

            return response;

        } catch (error) {
            const message = error instanceof Error ? error.message : "Lo sentimos, tuvimos un problema al reactivar el producto";

            setError(message);

            return null;

        } finally {
            setLoading(false);
        }
    };

    return { restoreProduct, loading, error };
};
