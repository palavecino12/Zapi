
import { Request, Response, NextFunction } from "express";
import { getCurrentUserService, loginService } from "./service";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        const result = await loginService(username, password);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};

// Recuperar el usuario de la sesión actual
export const getCurrentUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // El ID fue obtenido y validado por authMiddleware
        const userId = req.user!.id;

        const user = await getCurrentUserService(userId);

        return res.status(200).json({ user });

    } catch (error) {
        next(error);
    }
};