import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import Header from "../../components/Header"
import { Spinner } from "../../components/feedback/Spinner"
import { InfoModal } from "../../components/feedback/InfoModal"
import { useGetStatistics } from "../../hooks/useGetStatistics"
import { useState, useEffect } from "react"

// Formatear fecha para mostrar en el eje X
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
}

export const Statistics = () => {

    const { statistics, loading, error } = useGetStatistics()

    //Para manejar el error de traer las estadisticas.
    const [openModal, setOpenModal] = useState(false)
    const [prevError, setPrevError] = useState<string | null>(null)

    useEffect(() => {
        if (error && error !== prevError) {
            setPrevError(error)
            setOpenModal(true)
        }
    }, [error, prevError])

    // Personalizar tooltip para mostrar el valor formateado
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const dataKey = payload[0].dataKey
            const value = payload[0].value
            const formattedValue = dataKey === 'total'
                ? `$${value.toFixed(2)}`
                : value.toString()

            return (
                <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">{formatDate(label) || label}</p>
                    <p className="text-sm font-semibold text-violet-600">
                        {dataKey === 'total' ? 'Facturación' : 'Vendidos'}: {formattedValue}
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <>
            <div className="h-dvh flex flex-col overflow-hidden">
                <Header title="Estadísticas" />

                <main className="flex-1 overflow-y-auto px-3 py-2">
                    {loading ? (
                        <div className="flex-1 flex justify-center">
                            <Spinner />
                        </div>
                    ) : statistics ? (
                        <div className="flex flex-col gap-6">
                            {/* Resumen general */}
                            <div className="flex gap-4">
                                <div className="flex-1 bg-white rounded-xl shadow p-4 text-center">
                                    <p className="text-sm text-gray-500">Ventas totales</p>
                                    <p className="text-2xl font-bold text-violet-600">{statistics.totalSales}</p>
                                </div>
                                <div className="flex-1 bg-white rounded-xl shadow p-4 text-center">
                                    <p className="text-sm text-gray-500">Facturación total</p>
                                    <p className="text-2xl font-bold text-violet-600">
                                        ${statistics.totalRevenue.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            {/* Facturacion por dia */}
                            <div className="bg-white rounded-xl shadow p-4">
                                <h3 className="text-violet-600 font-semibold mb-2">Facturación por día</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <LineChart data={statistics.revenueByDay} margin={{ top: 20, right: 20, bottom: 50, left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={formatDate}
                                            axisLine={{ stroke: '#9ca3af' }}
                                            tickLine={{ stroke: '#9ca3af' }}
                                            tick={{ fill: '#6b7280', fontSize: 12 }}
                                            angle={-10}
                                            textAnchor="end"
                                            height={60}
                                        />
                                        <YAxis
                                            axisLine={{ stroke: '#9ca3af' }}
                                            tickLine={{ stroke: '#9ca3af' }}
                                            tick={{ fill: '#6b7280', fontSize: 12 }}
                                            tickFormatter={(value: any) => typeof value === 'number' ? `$${value.toFixed(2)}` : ''}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line
                                            type="monotone"
                                            dataKey="total"
                                            stroke="#7c3aed"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#7c3aed', strokeWidth: 2, stroke: 'white' }}
                                            activeDot={{ r: 6, fill: '#7c3aed' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Productos mas vendidos */}
                            <div className="bg-white rounded-xl shadow p-4">
                                <h3 className="text-violet-600 font-semibold mb-2">Productos más vendidos</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={statistics.topProducts} margin={{ top: 20, right: 20, bottom: 80, left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={{ stroke: '#9ca3af' }}
                                            tickLine={{ stroke: '#9ca3af' }}
                                            tick={{ fill: '#6b7280', fontSize: 10 }}
                                            angle={-15}
                                            textAnchor="end"
                                            height={100}
                                        />
                                        <YAxis
                                            axisLine={{ stroke: '#9ca3af' }}
                                            tickLine={{ stroke: '#9ca3af' }}
                                            tick={{ fill: '#6b7280', fontSize: 12 }}
                                            tickFormatter={(value: any) => typeof value === 'number' ? value.toString() : ''}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar
                                            dataKey="quantity"
                                            fill="#7c3aed"
                                            radius={[6, 6, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    ) : null}
                </main>
            </div>

            <InfoModal open={openModal} onAccept={() => setOpenModal(false)}>
                <h1>{error}</h1>
            </InfoModal>
        </>
    )
}
