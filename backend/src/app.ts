import "dotenv/config";
import express from "express";
import cors from "cors";

import saleRoutes from "./modules/sales/routes";
import productAdminRoutes from "./modules/product/adminRoutes";
import productClientRoutes from "./modules/product/clientRoutes";
import paymentRouter from "./modules/payment/routes";
import authRouter from "./modules/auth/routes";

import { errorHandler } from "./middlewares/errorHandlerMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/sales", saleRoutes);

app.use("/products", productAdminRoutes);//Rutas del administrador, si estan protegidas
app.use("/products", productClientRoutes);//Rutas del cliente, no estan protegidas

app.use("/payments", paymentRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`);
});