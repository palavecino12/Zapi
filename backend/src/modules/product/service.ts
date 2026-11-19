//En este archivo solo creamos la logica de negocio, vemos si existe o no el producto y lanzamos los errores
import { AppError } from "../../errors/AppError";
import { CartItemDTO } from "../../schemas/checkoutSchema";
import { CreateProductDTO } from "../../schemas/createProductSchema";
import * as productRepository from "./repository"
import { Product } from "@prisma/client";//type del producto
import { ReviewStockDTO, ReviewStockInputDTO, ReviewStockResult } from "./types";

//FUNCIONES PARA EL CLIENTE

//Service para traer todos los productos.
export const getProducts = async () => {
    //Retornamos directamente ya que si no hay productos, prisma retorna un array vacio
    return await productRepository.findProducts()
}

//Service para buscar prodcuto por code.
export const getProductByCode = async (code: string): Promise<Product> => {
    const product = await productRepository.findProductByCode(code)

    if (!product) {
        throw new AppError("Este producto no pertenece al negocio.", 404)
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
            throw new AppError(`Stock insuficiente para ${product.name}.`, 409);
        }
    }
}

//FUNCIONES PARA EL ADMINISTRADOR

//Service para sumar stock a un producto.
export const addStockService = async (code: string, quantity: number): Promise<Product> => {

    //Primero verificamos que el producto exista.
    const product = await productRepository.findProductByCodeAdmin(code);

    if (!product) {
        throw new AppError("El producto no existe.", 404);
    }

    //Validamos que el producto esté activo.
    if (!product.isActive) {
        throw new AppError("No se puede agregar stock a un producto inactivo.", 409);
    }

    //Validamos que la cantidad sea positiva.
    if (quantity <= 0 || !Number.isInteger(quantity)) {
        throw new AppError("La cantidad debe ser un número entero positivo.", 400);
    }

    return await productRepository.addStock(code, quantity);
};

//Service para traer todos los productos (activos e inactivos).
export const getAllProductsService = async (): Promise<Product[]> => {
    return await productRepository.findAllProducts()
};

//Service para traer todos los productos inactivos.
export const getInactiveProductsService = async (): Promise<Product[]> => {
    return await productRepository.findInactiveProducts()
};

//Service para crear un producto
export const createProductService = async (data: CreateProductDTO) => {
    const { product } = data

    //Primero validamos si el producto que quiere crear el usuario existe
    const existProduct = await productRepository.findProductByCode(product.code)

    if (existProduct) {
        throw new AppError("El producto ya existe", 409)
    }

    return await productRepository.createProduct(product)
}

//Service para ocultar un producto (lo pone como inactivo).
export const hideProductService = async (code: string): Promise<Product> => {

    //Primero validamos si el producto que quiere ocultar el usuario existe.
    const product = await productRepository.findProductByCode(code)

    if (!product) {
        throw new AppError("El producto no existe", 404)
    }

    return await productRepository.hideProduct(code);//Retorna el producto ocultado.
};

//Service para actualizar el nombre y el precio de un producto
export const updateProductService = async (code: string, name: string, price: number) => {
    //Validamos si el producto que queremos editar existe
    const product = await productRepository.findProductByCode(code)

    if (!product) {
        throw new AppError("El producto no existe.", 404)
    }

    return await productRepository.updateProduct(code, name, price)//retorna el producto editado
}

//Service para recuperar un producto.
export const restoreProductService = async (code: string): Promise<Product> => {

    //Primero verificamos que el producto exista y esté inactivo.
    const product = await productRepository.findInactiveProductByCode(code)

    if (!product) {
        throw new AppError("El producto no existe o ya está activo.", 404)
    }

    return await productRepository.restoreProduct(code)
};

//REVIEW STOCK

// Service para revisar y sincronizar el stock físico.
export const reviewStockService = async (data: ReviewStockInputDTO): Promise<ReviewStockDTO> => {

    const { products } = data;

    // Validamos que se hayan enviado productos.
    if (!Array.isArray(products) || products.length === 0) {
        throw new AppError("Debes enviar al menos un producto para revisar.", 400);
    }

    // Validamos que los códigos no estén repetidos.
    const codes = products.map(product => product.code);

    if (new Set(codes).size !== codes.length) {
        throw new AppError("No puedes enviar productos repetidos.", 400);
    }

    // Validamos el stock físico de cada producto.
    for (const item of products) {

        if (!item.code || typeof item.code !== "string") {
            throw new AppError("El código del producto es inválido.", 400);
        }

        if (!Number.isInteger(item.physicalStock) || item.physicalStock < 0) {
            throw new AppError("El stock físico debe ser un número entero mayor o igual a cero.", 400);
        }
    }

    // Ejecutamos la revisión dentro de una transacción.
    return await productRepository.executeTransaction(async (tx) => {

        // Buscamos los productos en la base de datos.
        const databaseProducts = await productRepository.findProductsByCodes(codes, tx);

        // Verificamos que todos los productos existan y estén activos.
        if (databaseProducts.length !== products.length) {
            throw new AppError("Uno o más productos no existen o están inactivos.", 404);
        }

        // Creamos un mapa para encontrar rápidamente cada producto por su código.
        const productsMap = new Map(
            databaseProducts.map(product => [product.code, product])
        );

        // Array donde guardaremos los resultados de la revisión.
        const results: ReviewStockResult[] = [];

        // Recorremos los productos enviados por el frontend.
        for (const item of products) {

            const product = productsMap.get(item.code)!;

            // Guardamos el stock original de la base de datos.
            const databaseStock = product.stock;

            // Calculamos la diferencia entre ambos stocks.
            const difference = Math.abs(item.physicalStock - databaseStock);

            // Determinamos el estado del producto.
            let status: ReviewStockResult["status"];

            if (item.physicalStock === databaseStock) {
                status = "correct";
            } else if (item.physicalStock < databaseStock) {
                status = "missing";
            } else {
                status = "surplus";
            }

            // Guardamos el resultado de la revisión.
            results.push({
                product: {
                    code: product.code,
                    name: product.name
                },
                databaseStock,
                physicalStock: item.physicalStock,
                difference,
                status
            });
        }

        // Actualizamos todos los stocks en una sola consulta.
        await productRepository.updatePhysicalStocks(products, tx);

        // Retornamos todos los resultados.
        return {
            message: "Revisión de stock completada.",
            results
        };
    });
};