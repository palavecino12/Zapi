import type { SaleHistoryDay as SaleHistoryDayType } from "../types/salesType";
import { formatCurrency, formatDateLabel } from "../utils/salesHistoryFormatters";
import { SaleCard } from "./SaleCard";

type Props = {
    day: SaleHistoryDayType;
};

export function SaleHistoryDay({ day }: Props) {
    return (
        <section className="overflow-hidden rounded-2xl border border-violet-200 bg-violet-50/40 shadow-sm">

            {/* Encabezado del día */}
            <div className="flex items-center justify-between gap-3 border-b border-violet-200 bg-violet-100/70 px-4 py-3">

                <h2 className="text-base font-bold capitalize text-violet-900">
                    {formatDateLabel(day.date)}
                </h2>

                <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold text-violet-700 shadow-sm">
                    {day.totalSales} {day.totalSales === 1 ? "venta" : "ventas"}
                </span>

            </div>

            {/* Ventas del día */}
            <div className="flex flex-col gap-3 p-3">

                {day.sales.map((sale) => (
                    <SaleCard key={sale.id} sale={sale} />
                ))}

                {/* Total del día */}
                <div className="flex items-center justify-between border-t border-violet-200 px-1 pt-3">

                    <span className="text-sm font-semibold text-violet-900">
                        Total del día
                    </span>

                    <span className="text-lg font-bold text-violet-800">
                        {formatCurrency(day.totalAmount)}
                    </span>

                </div>

            </div>

        </section>
    );
}