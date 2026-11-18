
import { useState } from "react"

import Header from "../../components/Header"
import SummaryCards from "../../features/statistics/components/SummaryCards"
import RevenueChart from "../../features/statistics/components/RevenueChart"
import PeriodFilter from "../../features/statistics/components/PeriodFilter"

import { summary } from "../../features/statistics/moks/summary.mock"
import { revenue } from "../../features/statistics/moks/revenue.mock"

import TopProductsChart from "../../features/statistics/components/TopProductsChart"
import { topProducts } from "../../features/statistics/moks/topProducts.mock"

import SaleStatusChart from "../../features/statistics/components/SaleStatusChart"
import { saleStatus } from "../../features/statistics/moks/saleStatus.mock"

import CategoriesChart from "../../features/statistics/components/CategoriesChart"
import { categories } from "../../features/statistics/moks/categories.mock"

import StockChart from "../../features/statistics/components/StockOverview"
import { stock } from "../../features/statistics/moks/stock.mock"

export const Statistics = () => {
    const [period, setPeriod] = useState("week")

    return (
        <div className="min-h-screen h-auto bg-gray-50">
            <Header title="Estadísticas" />

            <main className="px-4 py-6 sm:px-6 space-y-6">

                {/* Encabezado */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Resumen general
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Conocé el rendimiento de tu kiosco.
                    </p>
                </div>

                {/* Filtro de período */}
                <PeriodFilter value={period} onChange={setPeriod} />

                {/* Indicadores principales */}
                <SummaryCards data={summary} />

                {/* Productos más vendidos */}
                <TopProductsChart data={topProducts} />

                {/* Evolución de ingresos */}
                <RevenueChart data={revenue} />

                {/* Estado de las ventas */}
                <SaleStatusChart data={saleStatus} />

                {/* Ingresos por categoría */}
                <CategoriesChart data={categories} />

                {/* Estado del inventario */}
                <StockChart data={stock} />


            </main>
        </div>
    )
}
