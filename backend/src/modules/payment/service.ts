import client from "../../config/mercadopago";
import { Preference } from "mercadopago";

export const createPaymentPreference = async () => {
    try {
        const preference = new Preference(client);

        const response = await preference.create({
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
                    success: "http://localhost:5173/",
                    failure: "http://localhost:5173/",
                    pending: "http://localhost:5173/",
                },
                auto_return: undefined,//A futuro colcoar "approved" para que cuando el pago sea exitoso redirija automaticamente a la app (pero es mucho mas estricto)
            },
        });

        return response.init_point!;
    } catch (error: any) {
        console.log("ERROR COMPLETO MP:");
        console.log(process.env.MP_ACCESS_TOKEN)
        console.dir(error, { depth: null });
        throw error;
    }
};