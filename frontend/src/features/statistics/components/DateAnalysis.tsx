
import { useMemo, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { salesByDate } from "../moks/sales-by-date.mock";

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(value);

const parseDate = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
};


const WEEKDAYS = [
    "lun",
    "mar",
    "mié",
    "jue",
    "vie",
    "sáb",
    "dom",
];

const DateAnalysis = () => {
    const [month, setMonth] = useState("2026-11");
    const [from, setFrom] = useState("2026-11-01");
    const [to, setTo] = useState("2026-11-20");

    // Ventas correspondientes al mes seleccionado
    const monthSales = useMemo(() => {
        return salesByDate.filter((item) =>
            item.date.startsWith(month)
        );
    }, [month]);

    // Ventas correspondientes al rango seleccionado
    const rangeSales = useMemo(() => {
        return salesByDate.filter(
            (item) => item.date >= from && item.date <= to
        );
    }, [from, to]);

    // Promedio de ventas por día de la semana
    const weekdayAverage = useMemo(() => {
        if (monthSales.length === 0) return [];

        const [year, monthNumber] = month.split("-").map(Number);

        const totals = WEEKDAYS.map((weekday) => ({
            weekday,
            revenue: 0,
            sales: 0,
            units: 0,
            days: 0,
        }));

        // Incluimos los días sin ventas como cero.
        // Limitamos el cálculo al último día disponible en los datos.
        const lastRecordedDay = Math.max(
            ...monthSales.map((item) => parseDate(item.date).getDate())
        );

        for (let day = 1; day <= lastRecordedDay; day++) {
            const date = new Date(year, monthNumber - 1, day);
            // JavaScript: domingo = 0, lunes = 1...
            // Convertimos el índice para comenzar la semana en lunes.
            const index = (date.getDay() + 6) % 7;

            const dateString = [
                year,
                String(monthNumber).padStart(2, "0"),
                String(day).padStart(2, "0"),
            ].join("-");

            const record = monthSales.find(
                (item) => item.date === dateString
            );

            totals[index].revenue += record?.revenue ?? 0;
            totals[index].sales += record?.sales ?? 0;
            totals[index].units += record?.units ?? 0;
            totals[index].days += 1;
        }

        return totals.map((item) => ({
            weekday: item.weekday,
            revenue: item.days
                ? Math.round(item.revenue / item.days)
                : 0,
            sales: item.days
                ? Number((item.sales / item.days).toFixed(1))
                : 0,
            units: item.days
                ? Number((item.units / item.days).toFixed(1))
                : 0,
        }));
    }, [month, monthSales]);

    // Mejor fecha del mes según cada métrica
    const bestDays = useMemo(() => {
        if (monthSales.length === 0) return null;

        const bestRevenue = [...monthSales].sort(
            (a, b) => b.revenue - a.revenue
        )[0];

        const bestSales = [...monthSales].sort(
            (a, b) => b.sales - a.sales
        )[0];

        const bestUnits = [...monthSales].sort(
            (a, b) => b.units - a.units
        )[0];

        return {
            revenue: bestRevenue,
            sales: bestSales,
            units: bestUnits,
        };
    }, [monthSales]);

    // Totales del rango de fechas
    const rangeSummary = useMemo(() => {
        return rangeSales.reduce(
            (acc, item) => ({
                revenue: acc.revenue + item.revenue,
                sales: acc.sales + item.sales,
                units: acc.units + item.units,
            }),
            { revenue: 0, sales: 0, units: 0 }
        );
    }, [rangeSales]);

    const formatDate = (date: string) =>
        parseDate(date).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "long",
        });

    const monthLabel = parseDate(`${month}-01`).toLocaleDateString(
        "es-AR",
        { month: "long", year: "numeric" }
    );

    return (
        <section className="mt-8 space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800">
                    Análisis de ventas por fecha
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Descubrí cuáles son los días con mayor actividad de ventas.
                </p>
            </div>

            {/* Análisis mensual */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            Análisis mensual
                        </h3>
                        <p className="text-sm text-gray-500">
                            Mejor día y promedio por día de la semana.
                        </p>
                    </div>

                    <input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-violet-500"
                    />
                </div>

                {bestDays ? (
                    <>
                        <h4 className="mb-3 text-sm font-semibold text-gray-700">
                            Mejores días de {monthLabel}
                        </h4>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <BestDay
                                title="Mayor ingreso"
                                date={formatDate(bestDays.revenue.date)}
                                value={formatCurrency(bestDays.revenue.revenue)}
                            />

                            <BestDay
                                title="Más ventas"
                                date={formatDate(bestDays.sales.date)}
                                value={`${bestDays.sales.sales} ventas`}
                            />

                            <BestDay
                                title="Más unidades"
                                date={formatDate(bestDays.units.date)}
                                value={`${bestDays.units.units} unidades`}
                            />
                        </div>

                        <div className="mt-7">
                            <h4 className="mb-1 font-semibold text-gray-800">
                                Promedio de ingresos por día de la semana
                            </h4>
                            <p className="mb-4 text-sm text-gray-500">
                                Promedio de ingresos de cada lunes, martes, etc.
                            </p>


                            <div className="mt-6">
                                <div className="h-80 w-full sm:h-96">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={weekdayAverage}
                                            margin={{ top: 20, right: 12, left: 8, bottom: 12 }}
                                            barCategoryGap="25%"
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                                stroke="#e5e7eb"
                                            />

                                            <XAxis
                                                dataKey="weekday"
                                                tick={{ fontSize: 12, fill: "#6b7280" }}
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={12}
                                                interval={0}
                                            />

                                            <YAxis
                                                width={58}
                                                tickFormatter={(value) =>
                                                    `$${(value / 1000).toFixed(0)}k`
                                                }
                                                tick={{ fontSize: 11, fill: "#6b7280" }}
                                                tickLine={false}
                                                axisLine={false}
                                            />

                                            <Tooltip
                                                formatter={(value) => [
                                                    formatCurrency(Number(value)),
                                                    "Ingresos promedio",
                                                ]}
                                                labelFormatter={(label) => `Día: ${label}`}
                                                contentStyle={{
                                                    borderRadius: "12px",
                                                    border: "1px solid #e5e7eb",
                                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                                }}
                                            />

                                            <Bar
                                                dataKey="revenue"
                                                name="Ingresos promedio"
                                                fill="#7c3aed"
                                                radius={[6, 6, 0, 0]}
                                                maxBarSize={42}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>


                            <div className="mt-5 overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left text-gray-500">
                                            <th className="py-3">Día</th>
                                            <th className="py-3 text-right">Ingresos promedio</th>
                                            <th className="py-3 text-right">Ventas promedio</th>
                                            <th className="py-3 text-right">Unidades promedio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {weekdayAverage.map((item) => (
                                            <tr
                                                key={item.weekday}
                                                className="border-b border-gray-100"
                                            >
                                                <td className="py-3 font-medium capitalize text-gray-700">
                                                    {item.weekday}
                                                </td>
                                                <td className="py-3 text-right">
                                                    {formatCurrency(item.revenue)}
                                                </td>
                                                <td className="py-3 text-right">
                                                    {item.sales}
                                                </td>
                                                <td className="py-3 text-right">
                                                    {item.units}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="py-8 text-center text-sm text-gray-500">
                        No hay datos disponibles para este mes.
                    </p>
                )}
            </div>

            {/* Análisis por rango de fechas */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-5">
                    <h3 className="font-semibold text-gray-800">
                        Análisis por rango de fechas
                    </h3>
                    <p className="text-sm text-gray-500">
                        Elegí un período específico para consultar sus resultados.
                    </p>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="text-sm text-gray-600">
                        Desde
                        <input
                            type="date"
                            value={from}
                            max={to}
                            onChange={(e) => setFrom(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-violet-500"
                        />
                    </label>

                    <label className="text-sm text-gray-600">
                        Hasta
                        <input
                            type="date"
                            value={to}
                            min={from}
                            onChange={(e) => setTo(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-violet-500"
                        />
                    </label>
                </div>

                {rangeSales.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <MetricCard
                            title="Ingresos del período"
                            value={formatCurrency(rangeSummary.revenue)}
                        />
                        <MetricCard
                            title="Ventas del período"
                            value={String(rangeSummary.sales)}
                        />
                        <MetricCard
                            title="Unidades vendidas"
                            value={String(rangeSummary.units)}
                        />
                    </div>
                ) : (
                    <p className="py-6 text-center text-sm text-gray-500">
                        No hay ventas registradas en ese rango de fechas.
                    </p>
                )}
            </div>
        </section>
    );
};

const BestDay = ({
    title,
    date,
    value,
}: {
    title: string;
    date: string;
    value: string;
}) => (
    <div className="rounded-lg bg-violet-50 p-4">
        <p className="text-sm text-violet-700">{title}</p>
        <p className="mt-2 text-xl font-bold text-gray-800">{value}</p>
        <p className="mt-1 text-xs capitalize text-gray-500">{date}</p>
    </div>
);

const MetricCard = ({
    title,
    value,
}: {
    title: string;
    value: string;
}) => (
    <div className="rounded-lg border border-gray-100 bg-violet-50 p-4">
        <p className="text-sm text-violet-700">{title}</p>
        <p className="mt-2 text-xl font-bold text-gray-800">{value}</p>
    </div>
);

export default DateAnalysis;


{/*Endpoint	Función
GET /api/statistics/by-date?from=...&to=...	Ventas por rango de fechas
GET /api/statistics/weekday-average?month=11&year=2026	Promedio de ventas por día de semana
GET /api/statistics/best-day?month=11&year=2026	Día con mayores ingresos o ventas */}
