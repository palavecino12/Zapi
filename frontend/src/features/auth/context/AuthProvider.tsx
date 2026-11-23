
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "./auth.context";
import type { AuthUser, LoginCredentials } from "../types/authType";
import { login as loginService, getCurrentUser } from "../services/authServices";

const TOKEN_KEY = "zapi_token";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Iniciar sesión
    const login = useCallback(async (credentials: LoginCredentials) => {

        const data = await loginService(credentials);

        sessionStorage.setItem(TOKEN_KEY, data.token);

        setUser(data.user);

    }, []);

    // Cerrar sesión
    const logout = useCallback(() => {

        sessionStorage.removeItem(TOKEN_KEY);

        setUser(null);

    }, []);

    // Recuperar la sesión al iniciar la aplicación
    useEffect(() => {

        const restoreSession = async () => {

            const token = sessionStorage.getItem(TOKEN_KEY);

            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const currentUser = await getCurrentUser(token);

                setUser(currentUser);

            } catch {
                sessionStorage.removeItem(TOKEN_KEY);
                setUser(null);

            } finally {
                setIsLoading(false);
            }
        };

        restoreSession();

    }, []);

    useEffect(() => {
        const handleUnauthorized = () => {
            logout();
        };

        window.addEventListener("auth:unauthorized", handleUnauthorized);

        return () => {
            window.removeEventListener("auth:unauthorized", handleUnauthorized);
        };
    }, [logout]);

    const value = useMemo(() => ({
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout
    }), [user, isLoading, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
