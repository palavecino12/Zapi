
import { Request, Response, NextFunction } from "express";
import { loginService } from "./service";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        const result = await loginService(username, password);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};
