//En este archivo solo creamos la logica de negocio, vemos si existe o no el producto y lanzamos los errores
import { AppError } from "../../errors/AppError";
import { CartItemDTO } from "../../schemas/checkoutSchema";
import { deleteProduct, findProductByCode, findProducts } from "./repository"
import { Product } from "@prisma/client";//type del producto

//Service para traer todos los productos.
export const getProducts = async () => {
    //Retornamos directamente ya que si no hay productos, prisma retorna un array vacio
    return await findProducts()
}

//Service para buscar prodcuto por code.
export const getProductByCode = async (code: string): Promise<Product> => {
    const product = await findProductByCode(code)

    if (!product) {
        throw new AppError("Este producto no pertenece al negocio", 404)
    }

    return product
}

//Service para validar el stock de ciertos productos.
export const validateStock = (cart: CartItemDTO[], products: Product[]) => {

    for (const item of cart) {

        const product = products.find(
            product => product.id === item.productId
        )

        if (!product) {
            throw new AppError("Producto inexistente", 404);
        }

        if (product.stock < item.quantity) {
            throw new AppError(`Stock insuficiente para ${product.name}`, 409);
        }
    }
}

//FUNCIONES PARA EL ADMINISTRADOR

//Service para eliminar un producto
export const deleteProductService = async (code: string): Promise<Product> => {

    //Primero validamos si el producto que quiere eliminar el usuario existe
    const product = await findProductByCode(code)

    if (!product) {
        throw new AppError("El producto no existe", 404)
    }

    return await deleteProduct(code)//retorna el producto eliminado
};