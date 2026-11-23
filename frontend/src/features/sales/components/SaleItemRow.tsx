import type { SaleHistoryItem } from "../types/salesType";
import { formatCurrency } from "../utils/salesHistoryFormatters";

type Props = {
    item: SaleHistoryItem;
};

export function SaleItemRow({ item }: Props) {
    return (
        <div className="flex items-start justify-between gap-3 text-sm">
            <span className="min-w-0 truncate font-medium text-gray-700">
                {item.product.name}
            </span>

            <span className="shrink-0 text-gray-500">
                {item.quantity} x {formatCurrency(item.priceAtSale)}
            </span>
        </div>
    );
}