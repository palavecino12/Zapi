import { useState } from "react";
import type { ReviewStockDTO, ReviewStockInputDTO } from "../types/reviewStockTypes";
import { reviewStock } from "../services/stockService";

export const useReviewStock = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reviewProducts = async (data: ReviewStockInputDTO): Promise<ReviewStockDTO | null> => {

        setLoading(true);
        setError(null);

        try {
            const result = await reviewStock(data);

            return result;

        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : "Lo sentimos, tuvimos un problema al revisar el stock";

            setError(message);

            return null;

        } finally {
            setLoading(false);
        }
    };

    return { reviewProducts, loading, error };
};