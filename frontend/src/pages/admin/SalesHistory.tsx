import { useEffect } from "react";
import { ShoppingBag } from "lucide-react";

// Componentes
import AdminHeader from "../../components/AdminHeader";
import { Spinner } from "../../components/feedback/Spinner";
import { ErrorModal } from "../../components/feedback/ErrorModal";
import { SaleHistoryDay } from "../../features/sales/components/SaleHistoryDay";

// Hooks
import { useGetSalesHistory } from "../../features/sales/hooks/useGetSalesHistory";

export function SalesHistory() {
    const { history, loading, error, fetchHistory } = useGetSalesHistory();

    // Cargar historial al entrar a la pantalla.
    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    return (
        <>
            <ErrorModal
                error={error ? "No pudimos cargar el historial de ventas." : null}
            />

            <div className="relative flex h-full min-h-0 flex-col overflow-hidden">

                <AdminHeader title="Historial de Ventas" />

                <main className="flex min-h-0 flex-1 flex-col">

                    {loading ? (

                        <div className="flex min-h-0 flex-1 items-center justify-center">
                            <Spinner />
                        </div>

                    ) : error ? (

                        <div className="flex min-h-0 flex-1 items-center justify-center px-4">
                            <p className="text-center text-gray-500">
                                No se pudo cargar el historial de ventas.
                            </p>
                        </div>

                    ) : history.length === 0 ? (

                        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-4">

                            <ShoppingBag size={42} className="text-gray-300" />

                            <p className="text-center font-medium text-gray-500">
                                Todavía no hay ventas registradas.
                            </p>

                            <p className="text-center text-sm text-gray-400">
                                Cuando se realicen compras, aparecerán aquí.
                            </p>

                        </div>

                    ) : (

                        <div className="min-h-0 flex-1 overflow-y-auto px-3 pt-4 pb-35">

                            <div className="flex flex-col gap-5">

                                {history.map((day) => (
                                    <SaleHistoryDay key={day.date} day={day} />
                                ))}

                            </div>

                        </div>

                    )}

                </main>

            </div>
        </>
    );
}