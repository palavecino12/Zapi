import type { ProductApiResponse } from "../../products/types/apiResponseType";

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
    throw new Error("La variable de entorno VITE_API_URL no está definida");
}

const productsUrl = `${apiUrl.replace(/\/$/, "")}/products`;

//Service para sumar stock a un producto.
export const addStock = async (code: string, quantity: number): Promise<ProductApiResponse> => {

    const url = `${productsUrl}/${encodeURIComponent(code)}/stock`;

    const response = await fetch(url, {
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