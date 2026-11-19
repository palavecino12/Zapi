import { z } from "zod";

export const reviewStockSchema = z.object({
    products: z.array(
        z.object({
            code: z.string().min(1, "El código del producto es obligatorio"),
            physicalStock: z.number()
                .int("El stock debe ser un número entero")
                .min(0, "El stock no puede ser negativo")
        })
    ).min(1, "Debes enviar al menos un producto")
});

export type ReviewStockInputDTO = z.infer<typeof reviewStockSchema>;