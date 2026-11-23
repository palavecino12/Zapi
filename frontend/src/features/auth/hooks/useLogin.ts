
import { useState } from "react";

import { useAuth } from "./useAuth";
import type { LoginCredentials } from "../types/authType";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { login } = useAuth();

    const loginUser = async (credentials: LoginCredentials): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            await login(credentials);

        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : "Error al iniciar sesión";

            setError(message);
            throw error;

        } finally {
            setLoading(false);
        }
    };

    return {
        loginUser,
        loading,
        error
    };
};
