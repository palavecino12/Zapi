import { z } from "zod";

export const productCodeSchema = z.object({
    code: z.string().min(1, "El código es obligatorio"),
});

export type ProductCodeDTO = z.infer<typeof productCodeSchema>;