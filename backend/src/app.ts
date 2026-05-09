import "dotenv/config";
import express from "express";
import cors from "cors";

import paymentRoutes from "./modules/payment/routes";
import productRouter from "./modules/product/routes"

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors())
app.use(express.json());

//Routes
app.use("/payment", paymentRoutes);
app.use("/products", productRouter)


app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`);
});