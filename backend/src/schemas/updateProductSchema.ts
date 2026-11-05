import { z } from "zod";

export const updateProductSchema = z.object({
        name: z.string().min(1, "El nombre es obligatorio"),
        price: z.number().positive("El precio debe ser mayor a 0"),
});
