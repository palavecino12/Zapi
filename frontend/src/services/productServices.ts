//Servicios de los productos encargados de comunicarse con la API del backend
import type { Product } from "../types/productType"

const apiUrl = import.meta.env.VITE_API_URL
if (!apiUrl) {
    console.error("La variable de entorno VITE_API_URL no está definida");
}

//type de lo que retorna el back al momento de eliminar un producto con exito
type DeleteProductResponse = {
    message: string;
    product: Product;
};

//Service para traer todos los productos
export const getProducts = async () => {
        const url = `${apiUrl}/products`

        const response = await fetch(url)

        if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse.message || "Error desconocido al obtener productos")
        }

        const products: Product[] = await response.json()

        return products;
}

//service para traer un producto segun su codigo
export const getProductByCode = async (code: string): Promise<Product> => {
        const url = `${apiUrl}/products/${code}`

        const response = await fetch(url)

        if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse.message || "Error desconocido al obtener el producto")//retornamos el mensaje de error que creo el back
        }

        const product: Product = await response.json();

        return product;
}

//Service para eliminar un producto segun su codigo
export const deleteProductByCode = async (code: string): Promise<DeleteProductResponse> => {
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
}

