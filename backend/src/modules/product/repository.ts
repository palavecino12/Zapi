//En este archivo solo nos comunicamos con Prisma (no tenemos que validar nada)
import prisma from "../../config/prisma";
import { Prisma, Product } from "@prisma/client";

//FUNCIONES USADAS POR EL CLIENTE

//Trae todos los productos activos.
export const findProducts = async (): Promise<Product[]> => {
    return await prisma.product.findMany({
        where: {
            stock: {
                gte: 1,
            },

            isActive: true
        },
    })
}

//Busca un unico producto por code.
export const findProductByCode = async (code: string): Promise<Product | null> => {
    return await prisma.product.findUnique({
        where: {
            code,
            isActive: true

        }
    });
};

//Trae ciertos productos buscados por sus ids.
//Esto se usa para buscar los productos que el usuario añadio al carrito.
export const findProductsByIds = async (ids: number[]): Promise<Product[]> => {
    return prisma.product.findMany({
        where: {
            id: {
                in: ids
            },
            isActive: true
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

//Actualizar el stock de un producto

//Trae todos los productos (activos e inactivos).
export const findAllProducts = async (): Promise<Product[]> => {
    return await prisma.product.findMany();
};

//Trae todos los productos inactivos.
export const findInactiveProducts = async (): Promise<Product[]> => {
    return await prisma.product.findMany({
        where: {
            isActive: false
        }
    });
};

//Crea un nuevo producto.
export const createProduct = async (productData: Prisma.ProductCreateInput): Promise<Product> => {
    return await prisma.product.create({
        data: productData
    });
};

//Elimina producto (solo lo pone como inactivo)
export const deleteProduct = async (code: string): Promise<Product> => {
    return await prisma.product.update({
        where: { code: code },
        data: { isActive: false }
    });
};

//Editar un producto (solo el nombre y el precio)
export const updateProduct = async (code: string, name: string, price: number): Promise<Product> => {
    return await prisma.product.update({
        where: {
            code
        },
        data: {
            name,
            price
        }
    })
}

//Recupera un producto (lo vuelve a poner como activo).
export const restoreProduct = async (code: string): Promise<Product> => {
    return await prisma.product.update({
        where: { code },
        data: { isActive: true }
    });
};

//Busca un producto inactivo por código.
export const findInactiveProductByCode = async (code: string): Promise<Product | null> => {
    return await prisma.product.findFirst({
        where: {
            code,
            isActive: false
        }
    });
};