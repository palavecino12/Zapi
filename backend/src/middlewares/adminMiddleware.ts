import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/AppError";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Verificar que el usuario esté autenticado.
    if (!req.user) {return next(new AppError("No autorizado", 401));}

    // Verificar que sea administrador.
    if (req.user.role !== "ADMIN") {
        return next(new AppError("No tenés permisos para realizar esta operación", 403));
    }

    next();
};