//Servicio encargado de crear una preferencia de pago utilizando la SDK de Mercado Pago
import client from "../../config/mercadopago";
import { Preference } from "mercadopago";

export const createPaymentPreference = async () => {
    try {
        const preference = new Preference(client);//Se instancia la clase Preference utilizando el cliente configurado de Mercado Pago (zapi)

        const response = await preference.create({//Se crea una preferencia con los datos del producto a pagar
            body: {
                items: [
                    {
                        id: "producto1",
                        title: "Compra de prueba",
                        unit_price: 1000,
                        quantity: 1,
                        currency_id: "ARS",
                    },
                ],
                back_urls: {
                    success: `${process.env.FRONTEND_URL}/success`,
                    failure: `${process.env.FRONTEND_URL}/error`,
                    pending: "http://localhost:5173/",
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