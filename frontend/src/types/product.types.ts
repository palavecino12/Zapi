export interface Product {
    id: number;
    code: string;
    name: string;
    price: number;
    stock: number;
    createdAt: string;
}

export type CreateProductDTO = Omit<Product, "id" | "createdAt">;