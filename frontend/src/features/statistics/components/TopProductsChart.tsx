
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"

export interface TopProduct {
    name: string
    quantity: number
}

interface TopProductsChartProps {
    data: TopProduct[]
    loading?: boolean
}

const TopProductsChart = ({
    data,
    loading = false,
}: TopProductsChartProps) => {

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
                    Productos más vendidos
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Ranking de productos según unidades vendidas.
                </p>
            </div>

            {data.length === 0 ? (
                <div className="flex h-[280px] items-center justify-center text-sm text-gray-400">
                    No hay ventas registradas en este período.
                </div>
            ) : (
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{
                                top: 5,
                                right: 20,
                                left: 10,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                horizontal={false}
                            />

                            <XAxis
                                type="number"
                                allowDecimals={false}
                                tick={{ fontSize: 12 }}
                            />

                            <YAxis
                                type="category"
                                dataKey="name"
                                width={110}
                                tick={{ fontSize: 11 }}
                            />

                            <Tooltip
                                formatter={(value) => [
                                    `${value} unidades`,
                                    "Vendidas",
                                ]}
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid #e5e7eb",
                                    fontSize: "12px",
                                }}
                            />

                            <Bar
                                dataKey="quantity"
                                fill="#7c3aed"
                                radius={[0, 5, 5, 0]}
                                barSize={22}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

        </section>
    )
}

export default TopProductsChart

// Endpoint futuro:
// GET /api/statistics/top-products?period=week
//
// Respuesta esperada:
// [
//   { "name": "Gaseosa", "quantity": 45 },
//   { "name": "Alfajor", "quantity": 32 }
// ]
