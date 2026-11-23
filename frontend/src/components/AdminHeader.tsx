
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../features/auth/hooks/useAuth";

type Props = {
    title?: string;
};

function AdminHeader({ title = "Administración" }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const initial = user?.username?.charAt(0).toUpperCase() ?? "U";

    // Cerrar el menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/admin/login", { replace: true });
    };

    return (
        <header className="mb-3 w-full border-b-2 border-violet-200 bg-white px-4 py-4 shadow-sm">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                <div />

                <h2 className="text-center text-xl font-bold tracking-tight text-violet-600">
                    {title}
                </h2>

                {/* Usuario y menú */}
                <div ref={menuRef} className="relative flex justify-end">
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-xl font-bold text-violet-700 transition hover:bg-violet-200"
                        aria-label="Opciones de usuario"
                        aria-expanded={menuOpen}
                    >
                        {initial}
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-violet-100 bg-white shadow-lg">
                            <div className="border-b border-gray-200 px-5 py-4">
                                <p className="text-base font-semibold text-gray-800">
                                    {user?.username}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Administrador
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex w-full items-center gap-1 px-5 py-4 text-base font-medium text-red-600 transition hover:bg-red-50"
                            >
                                <LogOut size={20} />
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
