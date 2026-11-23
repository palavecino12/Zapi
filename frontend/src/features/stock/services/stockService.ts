import { authFetch } from "../../auth/services/authFetch";
import type { ProductApiResponse } from "../../products/types/apiResponseType";
import type { ReviewStockDTO, ReviewStockInputDTO } from "../types/reviewStockTypes";

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
    throw new Error("La variable de entorno VITE_API_URL no está definida");
}

const productsUrl = `${apiUrl.replace(/\/$/, "")}/products`;

//Service para sumar stock a un producto.
export const addStock = async (code: string, quantity: number): Promise<ProductApiResponse> => {

    const url = `${productsUrl}/${encodeURIComponent(code)}/stock`;

    const response = await authFetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity })
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error desconocido al agregar stock");
    }

    const data: ProductApiResponse = await response.json();

    return data;
};

// Service para revisar y actualizar el stock físico de varios productos.
export const reviewStock = async (data: ReviewStockInputDTO): Promise<ReviewStockDTO> => {

    const url = `${productsUrl}/review-stock`;

    const response = await authFetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorResponse = await response.json();

        throw new Error(
            errorResponse.message || "Error desconocido al revisar el stock"
        );
    }

    const result: ReviewStockDTO = await response.json();

    return result;
};