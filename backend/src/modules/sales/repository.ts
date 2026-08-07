import prisma from "../../config/prisma";
import { CreateSaleDTO, CreateSaleItemDTO } from "./types";

export const createSale = (sale: CreateSaleDTO) => {
    return prisma.sale.create({
        data: sale
    });
};

export const createSaleItems = (saleItems: CreateSaleItemDTO[]) => {
    return prisma.saleItem.createMany({
        data: saleItems
    });
};