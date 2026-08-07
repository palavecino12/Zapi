import { Sale, SaleItem } from "@prisma/client";

export type CreateSaleDTO = Omit<Sale, "id" | "createdAt" | "status">;

export type CreateSaleItemDTO = Omit<SaleItem, "id">;

export interface CartItemDTO {
    productId: number;
    quantity: number;
}

//Types que recibe el back del front al pagar un carrito.
export interface CreateSaleBodyDTO {
    items: CartItemDTO[];
}