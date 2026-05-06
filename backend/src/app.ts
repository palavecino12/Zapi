import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import paymentRoutes from "./modules/payment/routes";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())

app.use(express.json());
app.use("/payment", paymentRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Servidor funcionando correctamente");
});

app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`);
});