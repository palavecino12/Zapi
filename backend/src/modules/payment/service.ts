//Servicio encargado de crear una preferencia de pago utilizando la SDK de Mercado Pago
import client from "../../config/mercadopago";
import { Preference } from "mercadopago";
import { type PaymentItem } from "./types"
import { findProductsByIds } from "../product/repository";

export const createPaymentPreference = async (items: PaymentItem[]) => {
    try {
        //Buscamos los productos por id
        const products = await findProductsByIds(
            items.map(item => item.id)
        );

        //Creamos el array de los productos de la base de datos con la cantidad que eligio el usuario
        const paymentItems = items.map(item => {

            //Guardamos cada producto para poder relacionarlo con la cantidad
            const product = products.find(
                product => product.id === item.id
            );

            if (!product) {
                throw new Error("Producto no encontrado");
            }

            return {
                id: String(product.id),
                title: product.name,
                unit_price: Number(product.price),
                quantity: item.quantity,
                currency_id: "ARS"
            };
        });

        const preference = new Preference(client);//Se instancia la clase Preference utilizando el cliente configurado de Mercado Pago (zapi)

        const response = await preference.create({//Se crea una preferencia con los datos del producto a pagar

            body: {
                items: paymentItems,
                back_urls: {
                    success: `${process.env.FRONTEND_URL}/success`,
                    failure: `${process.env.FRONTEND_URL}/error`,
                    pending: "",//Por el momento no lo usariamos
                },
                auto_return: undefined,//A futuro colocar "approved" para que cuando el pago sea exitoso redirija automaticamente a la app (pero es mucho mas estricto)
            },
        });

        return response.init_point!;//Mercado Pago devuelve un init_point, que es la URL de checkout donde el usuario realiza el pago

    } catch (error: any) {

        console.log("ERROR COMPLETO MP:");
        console.dir(error, { depth: null });
        throw error;

    }
};