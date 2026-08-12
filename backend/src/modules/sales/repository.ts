import prisma from "../../config/prisma";
import { Prisma, SaleStatus } from "@prisma/client";
import { CreateSaleDTO, CreateSaleItemDTO } from "./types";

//Crea el sale al momento que el usuario hace click en pagar.
export const createSale = (sale: CreateSaleDTO) => {
    return prisma.sale.create({
        data: sale
    });
};

//Crea los items del sale.
export const createSaleItems = (saleItems: CreateSaleItemDTO[]) => {
    return prisma.saleItem.createMany({
        data: saleItems
    });
};

//Busca un sale a traves del id.
//Tambien trae los saleItems de la sale.
export const findSaleById = (id: number) => {
    return prisma.sale.findUnique({
        where: { id },
        include: { items: true }
    })
}

//Actualiza el estado del sale.
export const updateSaleStatus = (id: number, status: SaleStatus, tx: Prisma.TransactionClient = prisma) => {
    return tx.sale.update({
        where: { id },
        data: { status }
    })
}