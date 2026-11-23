
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { Loading } from "../../../components/feedback/Loading";

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading, user } = useAuth();

    // Esperamos a que termine la restauración de sesión.
    if (isLoading) {
        return <Loading message="Verificando sesión..." />;
    }

    // Solo permitimos el acceso a usuarios ADMIN autenticados.
    if (!isAuthenticated || user?.role !== "ADMIN") {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};
