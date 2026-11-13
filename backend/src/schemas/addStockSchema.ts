import { z } from "zod";

export const addStockSchema = z.object({
    quantity: z.number()
        .int("La cantidad debe ser un número entero")
        .positive("La cantidad debe ser mayor a 0"),
});

export type AddStockDTO = z.infer<typeof addStockSchema>;