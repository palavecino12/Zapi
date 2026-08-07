//Servicios de los pagos encargados de comunicarse con la API del backend
import type { PaymentItem } from "../types/productType";

const apiUrl = import.meta.env.VITE_API_URL
if (!apiUrl) {
    console.error("La variable de entorno VITE_API_URL no está definida");
}

//Service para pasar los productos del carrito al back
export const createCheckout = async (items: PaymentItem[]) => {
    try {
        const url = `${apiUrl}/sales/checkout`

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items })
        });

        if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse.message || "Error desconocido al crear pago")//retornamos el mensaje de error que creo el back
        }

        const data: { url: string } = await response.json();

        return data

    } catch (error) {
        console.error(error);
        throw error;
    }
}