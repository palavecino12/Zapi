//Express ya tiene definido el tipo Request. Nosotros lo estamos ampliando 
// para agregarle una propiedad user.

//De esta manera, después de validar el JWT podremos guardar los datos del 
// usuario en req.user y acceder a ellos desde los controllers.

export {};

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                role: "ADMIN" | "EMPLOYEE";
            };
        }
    }
}