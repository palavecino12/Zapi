
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"

interface RevenueData {
    date: string
    revenue: number
}

type Period = "day" | "week" | "month" | "year"

interface RevenueChartProps {
    data: RevenueData[]
    period: Period
    loading?: boolean
}

const formatCurrency = (value: number) => {
    return value.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    })
}

const PERIOD_LABELS: Record<Period, string> = {
    day: "Ingresos totales de hoy",
    week: "Ingresos por día",
    month: "Ingresos por día del mes",
    year: "Ingresos por mes",
}

const RevenueChart = ({
    data,
    period,
    loading = false,
}: RevenueChartProps) => {

    const totalRevenue = data.reduce(
        (total, item) => total + item.revenue,
        0
    )

    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

            <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900">
                    Evolución de ingresos
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    {PERIOD_LABELS[period]}
                </p>
            </div>

            {loading ? (
                <div className="h-[260px] w-full animate-pulse rounded-lg bg-gray-100" />
            ) : data.length === 0 ? (
                <div className="flex h-[260px] items-center justify-center text-sm text-gray-400">
                    No hay ingresos disponibles para este período.
                </div>
            ) : period === "day" ? (

                // PRESENTACIÓN DIARIA
                <div className="flex min-h-[260px] flex-col justify-center rounded-xl bg-violet-50 px-5 py-8">

                    <p className="text-sm font-medium text-violet-700">
                        Total de ingresos del día
                    </p>

                    <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {formatCurrency(totalRevenue)}
                    </p>

                    <div className="mt-5 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-violet-600" />
                        <span className="text-xs text-gray-500">
                            Ventas pagadas
                        </span>
                    </div>

                </div>

            ) : (

                // PRESENTACIÓN SEMANAL, MENSUAL Y ANUAL
                <div className="h-[280px] w-full sm:h-[320px]">

                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 12,
                                left: 0,
                                bottom: 5,
                            }}
                        >

                            <defs>
                                <linearGradient
                                    id="revenueGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#7c3aed"
                                        stopOpacity={0.25}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#7c3aed"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#e5e7eb"
                            />

                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: "#9ca3af" }}
                                tickMargin={10}
                                interval={period === "month" ? 2 : 0}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: "#9ca3af" }}
                                tickFormatter={(value) =>
                                    `$${(value / 1000).toFixed(0)}k`
                                }
                                width={55}
                            />

                            <Tooltip
                                formatter={(value) => [
                                    formatCurrency(Number(value)),
                                    "Ingresos",
                                ]}
                                labelFormatter={(label) => `Fecha: ${label}`}
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid #e5e7eb",
                                    fontSize: "12px",
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#7c3aed"
                                strokeWidth={2.5}
                                fill="url(#revenueGradient)"
                                activeDot={{
                                    r: 5,
                                    fill: "#7c3aed",
                                    stroke: "#ffffff",
                                    strokeWidth: 2,
                                }}
                            />

                        </AreaChart>
                    </ResponsiveContainer>

                </div>
            )}

            <div className="mt-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-600" />
                <span className="text-xs text-gray-500">
                    Ingresos por ventas pagadas
                </span>
            </div>

        </div>
    )
}

export default RevenueChart


// =====================================================
// ENDPOINT QUE DEBE CONSUMIR ESTE COMPONENTE
// =====================================================

/*
    GET /api/statistics/revenue?period=week

    DESCRIPCIÓN:
    Devuelve los ingresos agrupados por día
    para el período seleccionado.

    RESPUESTA ESPERADA:

    {
        "period": "week",
        "data": [
            { "date": "12 Nov", "revenue": 28000 },
            { "date": "13 Nov", "revenue": 31500 },
            { "date": "14 Nov", "revenue": 24800 }
        ]
    }

    IMPORTANTE:
    - Solo considerar ventas con estado PAID.
    - Utilizar Sale.total para calcular los ingresos.
    - Agrupar por Sale.createdAt.
    - No incluir ventas PENDING, CANCELLED ni EXPIRED.

    El componente recibe los datos mediante la prop "data".
    No realiza consultas al backend.
*/
