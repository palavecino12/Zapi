import { MercadoPagoConfig } from "mercadopago";

const accessToken = process.env.MP_ACCESS_TOKEN;

if (!accessToken) {
    throw new Error("MP_ACCESS_TOKEN no está configurada");
}

//Crea una instancia del cliente de mercado pago
const client = new MercadoPagoConfig({
    accessToken,
});

export default client;