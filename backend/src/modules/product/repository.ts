//En este archivo solo nos comunicamos con Prisma (no tenemos que validar nada)
import prisma from "../../config/prisma";
import { Product } from "@prisma/client";

//Traer todos los productos
export const findProducts = async (): Promise<Product[]> => {
    return await prisma.product.findMany()
}

//Buscar producto por code
export const findProductByCode = async (code: string): Promise<Product | null> => {
    return await prisma.product.findUnique({
        where: {
            code
        }
    });
};

//Eliminar producto (si no existe el producto o algo, prisma lanza un error)
export const deleteProduct = async (code: string): Promise<Product> => {
    return await prisma.product.delete({
        where: {
            code
        },
    });
};