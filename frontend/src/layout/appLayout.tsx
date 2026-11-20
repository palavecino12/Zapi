import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function AppLayout() {
    const location = useLocation();

    const titles: Record<string, string> = {
        "/admin/products": "Mis Productos",
        "/admin/statistics": "Estadísticas",
        "/admin/stock": "Stocks",
    };

    const title = titles[location.pathname] ?? "Zapi";

    return (
        <div className="flex h-dvh flex-col overflow-hidden">

            {/* Header */}
            <Header title={title} />

            {/* Única zona desplazable */}
            <main className="min-h-0 flex-1 overflow-y-auto pb-20">
                <Outlet />
            </main>

            {/* Navbar */}
            <Navbar />

        </div>
    );
}