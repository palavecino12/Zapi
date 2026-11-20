
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"

export interface CategoryData {
    category: string
    revenue: number
}

interface CategoriesChartProps {
    data: CategoryData[]
    loading?: boolean
}

const formatCurrency = (value: number) =>
    value.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    })

const CategoriesChart = ({
    data,
    loading = false,
}: CategoriesChartProps) => {

    if (loading) {
        return (
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-5 h-5 w-48 animate-pulse rounded bg-gray-200" />
                <div className="h-[280px] animate-pulse rounded-lg bg-gray-100" />
            </div>
        )
    }

    return (
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="mb-5">
                <h3 className="text-base font-semibold text-gray-900">
                    Ingresos por categoría
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Comparación de ingresos generados por cada categoría.
                </p>
            </div>

            {data.length === 0 ? (
                <div className="flex h-[280px] items-center justify-center text-sm text-gray-400">
                    No hay datos disponibles para este período.
                </div>
            ) : (
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 15,
                                left: 10,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="category"
                                tick={{ fontSize: 11 }}
                                interval={0}
                                angle={-15}
                                textAnchor="end"
                                height={55}
                            />

                            <YAxis
                                tick={{ fontSize: 11 }}
                                tickFormatter={(value) =>
                                    `$${Number(value).toLocaleString("es-AR")}`
                                }
                                width={85}
                            />

                            <Tooltip
                                formatter={(value) => [
                                    formatCurrency(Number(value)),
                                    "Ingresos",
                                ]}
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid var(--color-border)",
                                    fontSize: "12px",
                                }}
                            />

                            <Bar
                                dataKey="revenue"
                                fill="var(--color-primary)"
                                radius={[5, 5, 0, 0]}
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

        </section>
    )
}

export default CategoriesChart

// Endpoint futuro:
// GET /api/statistics/categories?period=week
//
// Respuesta esperada:
// [
//   { "category": "Bebidas", "revenue": 125000 },
//   { "category": "Alimentos", "revenue": 85000 },
//   { "category": "Golosinas", "revenue": 42000 }
// ]
