import { Request, Response } from "express";

export const Webhook = (req: Request, res: Response) => {
    console.log("Webhook recibido");
    console.dir(req.body, { depth: null });
    console.log("hola")

    return res.status(200).json({
        ok: true
    });
}