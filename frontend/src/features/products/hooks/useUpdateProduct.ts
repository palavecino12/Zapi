import { useState } from "react";
import type { updateProductDTO } from "../types/productType";
import type { ProductApiResponse } from "../types/apiResponseType";
import { updateProduct } from "../services/productServices";

export const useUpdateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const editProduct = async (code: string, product: updateProductDTO): Promise<ProductApiResponse | null> => {

        setLoading(true);
        setError(null);

        try {
            const response = await updateProduct(code, product);
            return response;

        } catch (error) {
            const message = error instanceof Error ? error.message : "Lo sentimos, tuvimos un problema al editar el producto";

            setError(message);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { editProduct, loading, error };
};
