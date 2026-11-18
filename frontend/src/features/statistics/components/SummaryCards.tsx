
import { Wallet, ShoppingCart, Receipt, Package } from "lucide-react";

// =====================================================
// TIPOS DE DATOS
// =====================================================

interface SummaryData {
  totalRevenue: number;
  totalSales: number;
  averageTicket: number;
  totalUnitsSold: number;
}

interface SummaryCardsProps {
  data: SummaryData;
  loading?: boolean;
}

// =====================================================
// CONFIGURACIÓN DE LAS TARJETAS
// =====================================================

const cards = [
  {
    key: "totalRevenue",
    title: "Ingresos totales",
    icon: Wallet,
    description: "Dinero de ventas pagadas",
    color: "text-green-600",
    bgColor: "bg-green-100",
    format: (value: number) =>
      value.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 2,
      }),
  },
  {
    key: "totalSales",
    title: "Ventas realizadas",
    icon: ShoppingCart,
    description: "Operaciones completadas",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    format: (value: number) => value.toLocaleString("es-AR"),
  },
  {
    key: "averageTicket",
    title: "Ticket promedio",
    icon: Receipt,
    description: "Promedio por compra",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    format: (value: number) =>
      value.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 2,
      }),
  },
  {
    key: "totalUnitsSold",
    title: "Unidades vendidas",
    icon: Package,
    description: "Productos comercializados",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    format: (value: number) => value.toLocaleString("es-AR"),
  },
] as const;

// =====================================================
// COMPONENTE SUMMARY CARDS
// =====================================================

export default function SummaryCards({
  data,
  loading = false,
}: SummaryCardsProps) {

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">

              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>

            </div>

            <p className="text-sm text-gray-500 mb-1">
              {card.title}
            </p>

            {loading ? (
              <div className="h-7 w-28 bg-gray-200 rounded animate-pulse" />
            ) : (
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {card.format(data[card.key])}
              </h3>
            )}

            <p className="text-xs text-gray-400 mt-2">
              {card.description}
            </p>

          </div>
        );
      })}

    </div>
  );
}

// =====================================================
// ENDPOINT QUE DEBE CONSUMIR ESTE COMPONENTE
// =====================================================

/*
  GET /api/statistics/summary?period=week

  DESCRIPCIÓN:
  Devuelve los indicadores principales del kiosco
  para el período seleccionado.

  RESPUESTA ESPERADA:

  {
    "totalRevenue": 245800,
    "totalSales": 128,
    "averageTicket": 1919,
    "totalUnitsSold": 356
  }

  IMPORTANTE:
  - totalRevenue: suma de Sale.total de ventas PAID.
  - totalSales: cantidad de ventas con estado PAID.
  - averageTicket: totalRevenue / totalSales.
  - totalUnitsSold: suma de SaleItem.quantity
    perteneciente a ventas PAID.

  El componente NO realiza consultas al backend.
  Recibe los datos mediante la prop "data".
*/
