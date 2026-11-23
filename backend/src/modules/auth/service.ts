
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

import { AppError } from "../../errors/AppError";
import { findUserById, findUserByUsername } from "./repository";

export const loginService = async (username: string, password: string) => {

    //Busca al usuario
    const user = await findUserByUsername(username);

    //Comprueba que exista
    if (!user) {
        throw new AppError("Usuario o contraseña incorrectos", 401);
    }

    //Comprueba que esté activo
    if (!user.isActive) {
        throw new AppError("Usuario o contraseña incorrectos", 401);
    }

    //Compara contraseña con BCrypt
    const isPasswordValid = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!isPasswordValid) {
        throw new AppError("Usuario o contraseña incorrectos", 401);
    }

    //Obtiene la clave secreta
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new AppError("Error de configuración del servidor", 500);
    }

    const expiresIn = (process.env.JWT_EXPIRES_IN || "8h") as SignOptions["expiresIn"];
    
    //Genera JWT
    const token = jwt.sign(
        {
            role: user.role
        },
        secret,
        {
            subject: String(user.id),
            expiresIn
        }
    );

    //Devuelve información pública
    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role
        }
    };
};

// Recuperar los datos del usuario autenticado
export const getCurrentUserService = async (userId: number) => {

    // Busca al usuario por su ID
    const user = await findUserById(userId);

    // Comprueba que exista y esté activo
    if (!user || !user.isActive) {
        throw new AppError("Sesión inválida o usuario inactivo", 401);
    }

    // Devuelve únicamente información pública
    return {
        id: user.id,
        username: user.username,
        role: user.role
    };
};