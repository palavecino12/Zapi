//Servicios encargados de comunicarse con la API del backend

import type { Product } from "../types/product.types"
const apiUrl = import.meta.env.VITE_API_URL
if (apiUrl) {
    console.error("La variable de entorno VITE_API_URL no está definida");
}


//type de lo que retorna el back al momento de eliminar un ususario con exito
type DeleteProductResponse = {
    message: string;
    product: Product;
};

//service para traer un producto segun su codigo
export const getProductByCode = async (code: string): Promise<Product> => {
    try {
        const url = `${apiUrl}/products/${code}`

        const response = await fetch(url)

        if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse.message || "Error desconocido al obtener el producto")//retornamos el mensaje de error que creo el back
        }

        const product: Product = await response.json();

        return product;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Service para eliminar un producto segun su codigo
export const deleteProductByCode = async (code: string): Promise<DeleteProductResponse> => {
    try {
        const url = `${apiUrl}/products/${code}`

        const response = await fetch(url, {
            method: "DELETE"
        })

        if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse.message || "Error desconocido al eliminar el producto")
        }

        const data: DeleteProductResponse = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
