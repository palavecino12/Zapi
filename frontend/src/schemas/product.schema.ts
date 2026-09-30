// schemas/product.schema.ts
import { z } from 'zod';
import type { CreateProductDTO } from '../types/productType';

export const createProductSchema = z.object({
    code: z.string().min(1, 'Escaneá un código de barras'),
    name: z.string().trim().min(1, 'El nombre es obligatorio'),
    category: z.string().trim().min(1, 'La categoría es obligatoria'),
    price: z
        .number({ message: 'Ingresá un precio válido' })
        .positive('El precio debe ser mayor a 0'),
    stock: z
        .number({ message: 'Ingresá un stock válido' })
        .int('El stock debe ser un número entero')
        .min(0, 'El stock no puede ser negativo'),
}) satisfies z.ZodType<CreateProductDTO>;