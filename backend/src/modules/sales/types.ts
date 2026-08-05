import { Sale, SaleItem } from "@prisma/client";

export type CreateSaleDTO = Omit<Sale, "id" | "createdAt" | "status">;

export type CreateSaleItemDTO = Omit<SaleItem, "id">;