
import { useCallback, useState } from "react";
import { getSalesHistory } from "../services/saleServices";
import type { SaleHistoryDay } from "../types/salesType";

export const useGetSalesHistory = () => {
    const [history, setHistory] = useState<SaleHistoryDay[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchHistory = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getSalesHistory();
            setHistory(data.history);
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : "Error al obtener el historial de ventas";

            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { history, loading, error, fetchHistory };
};
