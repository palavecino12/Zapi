//Servicios de los productos encargados de comunicarse con la API del backend
import type { CreateProductDTO, updateProductDTO, Product } from "../types/productType";
import type { ProductApiResponse } from "../types/apiResponseType";

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
    throw new Error("La variable de entorno VITE_API_URL no está definida");
}

const productsUrl = `${apiUrl.replace(/\/$/, "")}/products`;

//SERVICIOS PARA EL CLIENTE

//Service para traer todos los productos activos con stock disponible
export const getProducts = async (): Promise<Product[]> => {

    const response = await fetch(productsUrl);

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
            errorResponse.message || "Error desconocido al obtener productos"
        );
    }

    const products: Product[] = await response.json();

    return products;
};

//Service para traer un producto según su código
export const getProductByCode = async (
    code: string
): Promise<Product | null> => {

    const url = `${productsUrl}/${encodeURIComponent(code)}`;

    const response = await fetch(url);

    // Que el producto no exista no se considera un error
    if (response.status === 404) return null;

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
            errorResponse.message || "Error desconocido al obtener el producto"
        );
    }

    const product: Product = await response.json();

    return product;
};

//SERVICIOS PARA EL ADMINISTRADOR

//Service para traer todos los productos, activos e inactivos
export const getAllProducts = async (): Promise<Product[]> => {

    const url = `${productsUrl}/all`;

    const response = await fetch(url);

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
            errorResponse.message || "Error desconocido al obtener los productos"
        );
    }

    const products: Product[] = await response.json();

    return products;
};

//Service para traer únicamente los productos inactivos
export const getInactiveProducts = async (): Promise<Product[]> => {

    const url = `${productsUrl}/inactive`;

    const response = await fetch(url);

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
            errorResponse.message || "Error desconocido al obtener los productos inactivos"
        );
    }

    const products: Product[] = await response.json();

    return products;
};

//Service para crear un producto
export const createProduct = async (product: CreateProductDTO): Promise<ProductApiResponse> => {

    const response = await fetch(productsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product })
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
            errorResponse.message || "Error desconocido al crear el producto"
        );
    }

    const data: ProductApiResponse = await response.json();

    return data;
};

//Service para editar un producto
export const updateProduct = async (code: string, product: updateProductDTO): Promise<ProductApiResponse> => {

    const url = `${productsUrl}/${encodeURIComponent(code)}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
            errorResponse.message || "Error desconocido al editar el producto"
        );
    }

    const data: ProductApiResponse = await response.json();

    return data;
};

//Service para ocultar un producto según su código.
export const hideProductByCode = async (code: string): Promise<ProductApiResponse> => {

    const url = `${productsUrl}/${encodeURIComponent(code)}`;

    const response = await fetch(url, {
        method: "PATCH"
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
            errorResponse.message || "Error desconocido al ocultar el producto"
        );
    }

    const data: ProductApiResponse = await response.json();

    return data;
};

//Service para recuperar un producto previamente desactivado
export const restoreProductByCode = async (code: string): Promise<ProductApiResponse> => {

    const url = `${productsUrl}/${encodeURIComponent(code)}/restore`;

    const response = await fetch(url, {
        method: "PATCH"
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
            errorResponse.message || "Error desconocido al recuperar el producto"
        );
    }

    const data: ProductApiResponse = await response.json();

    return data;
};
