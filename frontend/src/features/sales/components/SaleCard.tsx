import { Clock3 } from "lucide-react";
import type { SaleHistory } from "../types/salesType";
import { formatCurrency, formatTime } from "../utils/salesHistoryFormatters";
import { SaleItemRow } from "./SaleItemRow";

type Props = {
    sale: SaleHistory;
};

export function SaleCard({ sale }: Props) {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

            {/* Encabezado de la venta */}
            <div className="flex items-center justify-between gap-2">

                <div className="min-w-0">
                    <h3 className="font-bold text-gray-800">
                        Detalle de compra
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock3 size={13} />
                        <span>{formatTime(sale.payment.createdAt)} hs</span>
                    </div>
                </div>

                <span className="shrink-0 text-lg font-bold text-violet-700">
                    {formatCurrency(sale.total)}
                </span>

            </div>

            {/* Productos vendidos */}
            <div className="my-3 border-t border-gray-100" />

            <div className="flex flex-col gap-2">
                {sale.items.map((item) => (
                    <SaleItemRow key={item.id} item={item} />
                ))}
            </div>

        </article>
    );
}