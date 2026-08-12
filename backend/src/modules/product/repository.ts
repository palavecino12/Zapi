//En este archivo solo nos comunicamos con Prisma (no tenemos que validar nada)
import prisma from "../../config/prisma";
import { Prisma, Product } from "@prisma/client";

//FUNCIONES USADAS POR EL CLIENTE

//Trae todos los productos.
export const findProducts = async (): Promise<Product[]> => {
    return await prisma.product.findMany()
}

//Busca un unico producto por code.
export const findProductByCode = async (code: string): Promise<Product | null> => {
    return await prisma.product.findUnique({
        where: {
            code
        }
    });
};

//Trae ciertos productos buscados por sus ids.
export const findProductsByIds = async (ids: number[]): Promise<Product[]> => {
    return prisma.product.findMany({
        where: {
            id: {
                in: ids
            }
        }
    });
};

//Valida que el producto tenga stock suficiente, si lo tiene, lo descuenta.
export const decreaseStock = async (productId: number, quantity: number, tx: Prisma.TransactionClient) => {
    return await tx.product.updateMany({
        where: {
            id: productId,
            stock: { gte: quantity }
        },
        data: {
            stock: {
                decrement: quantity
            }
        }
    });
};

//FUNCIONES USADAS POR EL ADMINISTRADOR

//Elimina producto (si no existe el producto o algo, prisma lanza un error)
export const deleteProduct = async (code: string): Promise<Product> => {
    return await prisma.product.delete({
        where: {
            code
        },
    });
};