// Type del producto tal como lo recibimos del back.
export interface Product {
    id: number;
    code: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    createdAt: string;
    isActive: boolean;
}

// Type de los valores que va a introducir el admin al momento de crear un producto.
export type CreateProductDTO = Omit<Product, "id" | "createdAt" | "isActive">;

// Type que vamos a usar para editar un producto.
export type updateProductDTO = Pick<Product, "name" | "price">;

