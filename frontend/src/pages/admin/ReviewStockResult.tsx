
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import type {ReviewStockDTO,ReviewStockResult} from "../../features/stock/types/reviewStockTypes";

export const ReviewStockResultPage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // Recuperamos los datos enviados mediante navigate.
    const state = location.state as { reviewStock?: ReviewStockDTO } | null;

    const reviewData = state?.reviewStock;

    // Verificamos que existan resultados.(esto lo tengo qeu reemplazar por el modal)
    if (!reviewData) {
        return (
            <div className="min-h-dvh flex flex-col items-center justify-center p-6 text-center">
                <AlertTriangle size={40} className="text-red-500 mb-4" />

                <h2 className="text-xl font-semibold">
                    No hay resultados disponibles
                </h2>

                <p className="text-gray-500 mt-2">
                    No se encontraron datos de una revisión de stock.
                </p>

                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 px-6 py-3 rounded-xl bg-violet-600 text-white font-medium"
                >
                    Volver
                </button>
            </div>
        );
    }

    const correctProducts = reviewData.results.filter(
        product => product.status === "correct"
    ).length;

    const incorrectProducts = reviewData.results.length - correctProducts;

    // Renderiza el resultado individual de cada producto.
    const renderProductResult = (item: ReviewStockResult) => {

        const isCorrect = item.status === "correct";

        return (
            <div
                key={item.product.code}
                className={`flex items-center justify-between gap-3 p-4 rounded-xl border ${
                    isCorrect
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                }`}
            >
                <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 truncate">
                        {item.product.name}
                    </p>

                    <p className={`text-sm mt-1 font-medium ${
                        isCorrect ? "text-green-700" : "text-red-700"
                    }`}>
                        {item.status === "correct" && "Stock correcto"}

                        {item.status === "missing" &&
                            `Faltan ${item.difference} unidades`}

                        {item.status === "surplus" &&
                            `Sobran ${item.difference} unidades`}
                    </p>
                </div>

                <div className="shrink-0">
                    {isCorrect ? (
                        <CheckCircle2
                            size={26}
                            className="text-green-600"
                        />
                    ) : (
                        <AlertTriangle
                            size={26}
                            className="text-red-600"
                        />
                    )}
                </div>
            </div>
        );
    };

    return (
        <main className="min-h-dvh bg-gray-50 px-4 py-6 sm:px-6">

            <div className="max-w-xl mx-auto">

                {/* Encabezado */}
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Resultado de revisión
                    </h1>

                    <p className="text-gray-500 text-sm mt-1">
                        Resumen del inventario revisado.
                    </p>
                </header>

                {/* Resumen general */}
                <section className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 shadow-sm">

                    <p className="text-sm text-gray-900 mb-4">
                        Productos revisados: {reviewData.results.length}
                    </p>

                    <div className="grid grid-cols-2 gap-3">

                        <div className="bg-green-50 rounded-xl p-3">
                            <p className="text-sm text-green-700">
                                Correctos
                            </p>

                            <p className="text-2xl font-bold text-green-700">
                                {correctProducts}
                            </p>
                        </div>

                        <div className="bg-red-50 rounded-xl p-3">
                            <p className="text-sm text-red-700">
                                Con diferencias
                            </p>

                            <p className="text-2xl font-bold text-red-700">
                                {incorrectProducts}
                            </p>
                        </div>

                    </div>
                </section>

                {/* Lista de productos */}
                <section className="mb-6">

                    <h2 className="font-semibold text-gray-800 mb-3">
                        Detalle de productos
                    </h2>

                    <div className="flex flex-col gap-3">
                        {reviewData.results.map(renderProductResult)}
                    </div>

                </section>

                {/* Aviso importante */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <div className="flex gap-3">
                        <AlertTriangle
                            size={22}
                            className="text-amber-600 shrink-0"
                        />

                        <div>
                            <p className="font-semibold text-amber-800 text-sm">
                                Información temporal
                            </p>

                            <p className="text-sm text-amber-700 mt-1">
                                Estos resultados no serán almacenados.
                                Una vez que presiones Aceptar, no podrás
                                volver a consultar este resumen.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Botón aceptar */}
                <button
                    onClick={() => navigate("/admin/stock")}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl py-4 transition-colors"
                >
                    Aceptar
                </button>

            </div>
        </main>
    );
};
