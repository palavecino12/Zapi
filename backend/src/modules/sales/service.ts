import { Prisma, Product } from "@prisma/client";
import * as productRepository from "../product/repository";
import * as saleRepository from "./repository"
import * as paymentService from "../payment/service"
import * as productService from "../product/service";
import { CartItemDTO } from "./types";

const calculateTotal = (cart: CartItemDTO[], products: Product[]): number => {

    return cart.reduce((total, item) => {

        const product = products.find(
            product => product.id === item.productId
        );

        if (!product) {
            throw new Error("Producto inexistente");
        }

        return total + item.quantity * product.price.toNumber();

    }, 0);
};

export const createCheckout = async (cart: CartItemDTO[]) => {

    //Busca los productos por id.
    const products = await productRepository.findProductsByIds(
        cart.map(item => item.productId)
    );

    //Valida el stock de los productos.
    productService.validateStock(cart, products)

    //Calcula el total.
    const total = calculateTotal(cart, products)

    //Crea el sale. (retorna el id)
    const sale = await saleRepository.createSale({
        total: new Prisma.Decimal(total)
    });

    //Crea los saleItems
    await saleRepository.createSaleItems(cart.map(item => {

        const product = products.find(
            product => product.id === item.productId
        );

        if (!product) {
            throw new Error("Producto no encontrado");
        }

        return {
            quantity: item.quantity,
            priceAtSale: product.price,
            saleId: sale.id,
            productId: item.productId
        };
    })
    );

    //Crea el item de mercado pago para pasarcelo.
    const mercadoPagoItems = cart.map(item => {

        //Esta funcion la repito 4 veces. (optimizar) 
        const product = products.find(
            product => product.id === item.productId
        );

        if (!product) {
            throw new Error("Producto no encontrado");
        }

        return {
            id: String(product.id),
            title: product.name,
            quantity: item.quantity,
            unit_price: product.price.toNumber(),
            currency_id: "ARS" as const
        };
    });

    //Crea la preferencia.
    const preference = await paymentService.createPaymentPreference(sale.id, mercadoPagoItems);

    return preference.init_point
}