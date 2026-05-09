//En este archivo validamos reglas, orquestamos el repository, aplicamos logica de negocio y decidimos que devolver

import { deleteProduct, findProductByCode } from "./repository"
import { Product } from "@prisma/client";//type del producto

//Service para buscar prodcuto por code
export const getProductByCodeService = async (code: string): Promise<Product> => {
    const product = await findProductByCode(code)

    if (!product) {
        throw new Error("El producto no fue encontrado")
    }

    return product
}

//Service para eliminar un producto
export const deleteProductService = async (code: string): Promise<Product> => {
    //Primero validamos si el producto que quiere eliminar el usuario existe
    const product = await findProductByCode(code)

    if (!product) {
        throw new Error("El producto no existe")
    }

    return await deleteProduct(code)
};