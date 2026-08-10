import prisma from "../../config/prisma";
import { Prisma, SaleStatus } from "@prisma/client";
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

export const findSaleById = (id: number) => {
    return prisma.sale.findUnique({
        where: { id }
    })
}

export const updateSaleStatus = (id: number, status: SaleStatus, tx: Prisma.TransactionClient = prisma) => {
    return tx.sale.update({
        where: { id },
        data: { status }
    })
}