//En este archivo solo nos comunicamos con Prisma (no tenemos que validar nada)
import prisma from "../../config/prisma";
import { Product } from "@prisma/client";

//FUNCIONES USADAS POR EL CLIENTE

//Traer todos los productos.
export const findProducts = async (): Promise<Product[]> => {
    return await prisma.product.findMany()
}

//Buscar producto por code.
export const findProductByCode = async (code: string): Promise<Product | null> => {
    return await prisma.product.findUnique({
        where: {
            code
        }
    });
};

//Traemos ciertos productos buscados por sus ids.
export const findProductsByIds = async (ids: number[]): Promise<Product[]> => {
    return prisma.product.findMany({
        where: {
            id: {
                in: ids
            }
        }
    });
};

//FUNCIONES USADAS POR EL ADMINISTRADOR

//Eliminar producto (si no existe el producto o algo, prisma lanza un error)
export const deleteProduct = async (code: string): Promise<Product> => {
    return await prisma.product.delete({
        where: {
            code
        },
    });
};