import { z } from "zod";

export const checkoutSchema = z.object({
    cart: z.array(z.object({
        productId: z.number().int().positive(),
        quantity: z.number().int().positive(),
    })
    ).min(1, "El carrito no puede estar vacío"),
});

export type CartItemDTO = z.infer<typeof checkoutSchema>["cart"][number];