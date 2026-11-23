import type { AuthUser, LoginCredentials, LoginResponse } from "../types/authType";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
    throw new Error("La variable de entorno VITE_API_URL no está definida");
}

const authUrl = `${apiUrl.replace(/\/$/, "")}/auth`;

// Service para iniciar sesión
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {

    const response = await fetch(`${authUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
    }

    return data as LoginResponse;
};

// Consultar el usuario de la sesión actual
export const getCurrentUser = async (token: string): Promise<AuthUser> => {

    const response = await fetch(`${authUrl}/me`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "No se pudo recuperar la sesión");
    }

    return data.user as AuthUser;
};