
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts"

export interface StockData {
    status: "AVAILABLE" | "LOW" | "OUT_OF_STOCK"
    quantity: number
}

interface StockChartProps {
    data: StockData[]
    loading?: boolean
}

const STOCK_CONFIG = {
    AVAILABLE: {
        label: "Stock disponible",
        color: "#16a34a",
    },
    LOW: {
        label: "Stock bajo",
        color: "#eab308",
    },
    OUT_OF_STOCK: {
        label: "Agotados",
        color: "#ef4444",
    },
}

const StockOverview = ({
    data,
    loading = false,
}: StockChartProps) => {

    const chartData = data.map((item) => ({
        name: STOCK_CONFIG[item.status].label,
        quantity: item.quantity,
        color: STOCK_CONFIG[item.status].color,
    }))

    if (loading) {
        return (
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-5 h-5 w-48 animate-pulse rounded bg-gray-200" />
                <div className="mx-auto h-[260px] w-[260px] animate-pulse rounded-full bg-gray-100" />
            </div>
        )
    }

    return (
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="mb-5">
                <h3 className="text-base font-semibold text-gray-900">
                    Estado del inventario
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Distribución actual de productos según su stock.
                </p>
            </div>

            {chartData.every((item) => item.quantity === 0) ? (
                <div className="flex h-[280px] items-center justify-center text-sm text-gray-400">
                    No hay productos registrados.
                </div>
            ) : (
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="quantity"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={90}
                                paddingAngle={3}
                            >
                                {chartData.map((item, index) => (
                                    <Cell
                                        key={`stock-${index}`}
                                        fill={item.color}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value) => [
                                    `${value} productos`,
                                    "Cantidad",
                                ]}
                            />

                            <Legend
                                verticalAlign="bottom"
                                height={30}
                                wrapperStyle={{ fontSize: "12px" }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}

        </section>
    )
}

export default StockOverview

// Endpoint futuro:
// GET /api/statistics/stock
//
// Respuesta esperada:
// [
//   { "status": "AVAILABLE", "quantity": 85 },
//   { "status": "LOW", "quantity": 12 },
//   { "status": "OUT_OF_STOCK", "quantity": 5 }
// ]
