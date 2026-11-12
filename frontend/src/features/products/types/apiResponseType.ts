
import type { Product } from "./productType";

//Respuesta estándar del backend cuando una operación modifica un producto
export type ProductApiResponse = {
    message: string;
    product: Product;
};
