
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"

// =====================================================
// TIPOS DE DATOS
// =====================================================

interface RevenueData {
    date: string
    revenue: number
}

interface RevenueChartProps {
    data: RevenueData[]
    loading?: boolean
}

// =====================================================
// FORMATEAR IMPORTES
// =====================================================

const formatCurrency = (value: number) => {
    return value.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    })
}

// =====================================================
// COMPONENTE REVENUE CHART
// =====================================================

const RevenueChart = ({
    data,
    loading = false,
}: RevenueChartProps) => {

    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

            {/* Encabezado */}
            <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900">
                    Evolución de ingresos
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Ingresos generados por ventas pagadas.
                </p>
            </div>

            {/* Estado de carga */}
            {loading ? (
                <div className="h-[260px] w-full animate-pulse rounded-lg bg-gray-100" />
            ) : data.length === 0 ? (
                <div className="flex h-[260px] items-center justify-center text-sm text-gray-400">
                    No hay ingresos disponibles para este período.
                </div>
            ) : (

                /* Gráfico */
                <div className="h-[260px] w-full">

                    <ResponsiveContainer width="100%" height="100%">

                        <AreaChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
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
                                        stopColor="var(--color-primary)"
                                        stopOpacity={0.25}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-primary)"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="var(--color-border)"
                            />

                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
                                tickMargin={10}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
                                tickFormatter={(value) =>
                                    `$${value >= 1000 ? `${value / 1000}k` : value}`
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
                                    border: "1px solid var(--color-border)",
                                    fontSize: "12px",
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="var(--color-primary)"
                                strokeWidth={2.5}
                                fill="url(#revenueGradient)"
                                activeDot={{
                                    r: 5,
                                    fill: "var(--color-primary)",
                                    stroke: "var(--color-surface)",
                                    strokeWidth: 2,
                                }}
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </div>
            )}

            {/* Pie del gráfico */}
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
