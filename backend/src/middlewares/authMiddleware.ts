import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { AppError } from "../errors/AppError";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    // Verificar que exista el token.
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return next(new AppError("No autorizado", 401));
    }

    const token = authorization.split(" ")[1];

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return next(new AppError("Error de configuración del servidor", 500));
    }

    try {
        const decoded = jwt.verify(token, secret);

        // Verificar que el contenido del token sea válido.
        if (
            typeof decoded === "string" ||
            !decoded.sub ||
            (decoded.role !== "ADMIN" && decoded.role !== "EMPLOYEE")
        ) {
            return next(new AppError("Token inválido", 401));
        }

        const userId = Number(decoded.sub);

        if (!Number.isSafeInteger(userId) || userId <= 0) {
            return next(new AppError("Token inválido", 401));
        }

        // Guardar los datos del usuario en la petición.
        req.user = {
            id: userId,
            role: decoded.role
        };

        next();

    } catch (error) {
        return next(new AppError("Token inválido o expirado", 401));
    }
};