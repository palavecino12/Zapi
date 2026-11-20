
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts"

export interface SaleStatus {
    status: "PAID" | "PENDING" | "CANCELLED" | "EXPIRED"
    quantity: number
}

interface SaleStatusChartProps {
    data: SaleStatus[]
    loading?: boolean
}

const STATUS_CONFIG = {
    PAID: {
        label: "Pagadas",
        color: "var(--color-success)",
    },
    PENDING: {
        label: "Pendientes",
        color: "var(--color-warning-chart)",
    },
    CANCELLED: {
        label: "Canceladas",
        color: "var(--color-error-bright)",
    },
    EXPIRED: {
        label: "Expiradas",
        color: "var(--color-text-muted)",
    },
}

const SaleStatusChart = ({
    data,
    loading = false,
}: SaleStatusChartProps) => {

    const chartData = data.map((item) => ({
        name: STATUS_CONFIG[item.status].label,
        quantity: item.quantity,
        color: STATUS_CONFIG[item.status].color,
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
                    Estado de las ventas
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Distribución de ventas según su estado.
                </p>
            </div>

            {chartData.every((item) => item.quantity === 0) ? (
                <div className="flex h-[280px] items-center justify-center text-sm text-gray-400">
                    No hay ventas registradas en este período.
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
                                outerRadius={90}
                                innerRadius={55}
                                paddingAngle={3}
                            >
                                {chartData.map((item, index) => (
                                    <Cell
                                        key={`status-${index}`}
                                        fill={item.color}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value) => [
                                    `${value} ventas`,
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

export default SaleStatusChart

// Endpoint futuro:
// GET /api/statistics/sale-status?period=week
//
// Respuesta esperada:
// [
//   { "status": "PAID", "quantity": 120 },
//   { "status": "PENDING", "quantity": 8 },
//   { "status": "CANCELLED", "quantity": 5 },
//   { "status": "EXPIRED", "quantity": 3 }
// ]
