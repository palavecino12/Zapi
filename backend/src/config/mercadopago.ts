import { MercadoPagoConfig } from "mercadopago";

//Creamos una instancia del cliente con las configuraciones
const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!, //por el momento colocamos que nunca va a ser null pero mas adelante hay que validar
});

export default client;