
import { useNavigate } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";

export function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="min-h-dvh bg-gray-50 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md text-center">

                {/* Ilustración */}
                <div className="relative flex justify-center mb-8">
                    <div className="w-36 h-36 rounded-full bg-violet-100 flex items-center justify-center">
                        <SearchX
                            size={76}
                            strokeWidth={1.5}
                            className="text-violet-600"
                        />
                    </div>

                    <span className="absolute -top-2 right-[22%] bg-white border border-gray-200 shadow-sm rounded-xl px-3 py-1 text-sm font-bold text-violet-600">
                        404
                    </span>
                </div>

                {/* Mensaje */}
                <div className="space-y-3 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        ¡Ups! Página no encontrada
                    </h1>

                    <p className="text-gray-500 text-base leading-relaxed">
                        Parece que la página que estás buscando no existe,
                        fue movida o ya no está disponible.
                    </p>
                </div>

                {/* Acción */}
                <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center justify-center gap-2
                    bg-violet-600 hover:bg-violet-700
                    text-white font-semibold
                    px-6 py-3 rounded-xl
                    transition-colors duration-200
                    shadow-sm"
                >
                    <ArrowLeft size={19} />
                    Volver al inicio
                </button>

                <p className="mt-10 text-sm text-gray-400 font-medium">
                    Zapi · Kiosco de autogestión
                </p>

            </div>
        </main>
    );
}
