import { useState } from "react";
import { hideProductByCode } from "../services/productServices";
import type { ProductApiResponse } from "../types/apiResponseType";

export const useHideProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const hideProduct = async (code: string): Promise<ProductApiResponse | null> => {

        setLoading(true);
        setError(null);

        try {
            const response = await hideProductByCode(code);

            return response;

        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : "Lo sentimos, tuvimos un problema al ocultar el producto";

            setError(message);

            return null;

        } finally {
            setLoading(false);
        }
    };

    return { hideProduct, loading, error };
};