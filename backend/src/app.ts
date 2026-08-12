import "dotenv/config";
import express from "express";
import cors from "cors";

import saleRoutes from "./modules/sales/routes";
import productRouter from "./modules/product/routes"
import paymentRouter from "./modules/payment/routes"
import { errorHandler } from "./middlewares/errorHandlerMiddleware";


const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors())
app.use(express.json());

//Routes
app.use("/sales", saleRoutes);
app.use("/products", productRouter)
app.use("/payments", paymentRouter)

app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`);
});