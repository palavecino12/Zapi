import { scaleBand, scaleLinear, scaleTime } from "d3-scale"
import { barY, lineY, defineChart } from "@tanstack/charts"
import { Chart } from "@tanstack/react-charts"

import Header from "../../components/Header"
import { Spinner } from "../../components/feedback/Spinner"
import { InfoModal } from "../../components/feedback/InfoModal"
import { useGetStatistics } from "../../hooks/useGetStatistics"
import { useState } from "react"

export const Statistics = () => {

    const { statistics, loading, error } = useGetStatistics()

    //Para manejar el error de traer las estadisticas, mismo patron que en ViewProductList.
    const [openModal, setOpenModal] = useState(false)
    const [prevError, setPrevError] = useState(error)
    if (error !== prevError) {
        setPrevError(error)
        if (error) setOpenModal(true)
    }

    //Grafico de linea: facturacion por dia.
    const revenueChart = statistics && defineChart({
        marks: [
            lineY(statistics.revenueByDay, {
                x: (d) => new Date(d.date),
                y: "total",
            }),
        ],
        x: { scale: scaleTime, label: "Fecha" },
        y: { scale: scaleLinear, nice: true, label: "Facturación ($)", grid: true },
        tooltip: true,
    })

    //Grafico de barras: productos mas vendidos.
    const topProductsChart = statistics && defineChart({
        marks: [
            barY(statistics.topProducts, {
                x: "name",
                y: "quantity",
            }),
        ],
        x: { scale: () => scaleBand().padding(0.2), label: "Producto" },
        y: { scale: scaleLinear, nice: true, label: "Unidades vendidas", grid: true },
        tooltip: true,
    })

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
                                {revenueChart && (
                                    <Chart definition={revenueChart} height={280} ariaLabel="Facturación por día" />
                                )}
                            </div>

                            {/* Productos mas vendidos */}
                            <div className="bg-white rounded-xl shadow p-4">
                                <h3 className="text-violet-600 font-semibold mb-2">Productos más vendidos</h3>
                                {topProductsChart && (
                                    <Chart definition={topProductsChart} height={280} ariaLabel="Productos más vendidos" />
                                )}
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

