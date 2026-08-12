import { z } from "zod";

export const createProductSchema = z.object({
    code: z.string().min(1, "El código es obligatorio"),
    name: z.string().min(1, "El nombre es obligatorio"),
    price: z.number().positive("El precio debe ser mayor a 0"),
    stock: z.number().int().nonnegative("El stock no puede ser negativo"),
    category: z.string().min(1, "La categoría es obligatoria"),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;