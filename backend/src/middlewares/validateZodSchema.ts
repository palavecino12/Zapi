import { Request, Response, NextFunction } from "express"
import { ZodSchema } from "zod"
import { AppError } from "../errors/AppError";

export const validate = (schema: ZodSchema, target: "body" | "params" | "query" = "body") => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target])
    if (!result.success) {
        //Dejamos que lo maneje el error handler.
        return next(new AppError(result.error.issues[0].message, 400));
    }

    req[target] = result.data; //Ya validado y tipado
    next();
}