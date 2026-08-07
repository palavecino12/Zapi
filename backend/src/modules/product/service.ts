//En este archivo solo creamos la logica de negocio, vemos si existe o no el producto y lanzamos los errores
import { CartItemDTO } from "../sales/types";
import { deleteProduct, findProductByCode, findProducts, findProductsByIds } from "./repository"
import { Product } from "@prisma/client";//type del producto

//Service para traer todos los productos.
export const getProducts = async () => {

    //Retornamos directamente ya que si no hay productos, prisma retorna un array vacio
    return await findProducts()
}

//Service para buscar prodcuto por code.
export const getProductByCodeService = async (code: string): Promise<Product> => {
    const product = await findProductByCode(code)

    if (!product) {
        throw new Error("El producto no fue encontrado")
    }

    return product
}

//Service para validar el  stock de ciertos productos.
export const validateStock = (cart: CartItemDTO[], products: Product[]) => {

    for (const item of cart) {

        const product = products.find(
            product => product.id === item.productId
        )

        if (!product) {
            throw new Error("Producto inexistente");
        }

        if (product.stock < item.quantity) {
            throw new Error(`Stock insuficiente para ${product.name}`);
        }
    }
}

//FUNCIONES PARA EL ADMINISTRADOR

//Service para eliminar un producto
export const deleteProductService = async (code: string): Promise<Product> => {

    //Primero validamos si el producto que quiere eliminar el usuario existe
    const product = await findProductByCode(code)

    if (!product) {
        throw new Error("El producto no existe")
    }

    return await deleteProduct(code)//retorna el producto eliminado
};