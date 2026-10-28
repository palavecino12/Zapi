
import { ChartNoAxesCombined } from "lucide-react"
import Header from "../../components/Header"

export const Statistics = () => {
    return (
        <div className="min-h-dvh bg-gray-50">
            <Header title="Estadísticas" />

            <main className="flex min-h-[70dvh] items-center justify-center px-6">
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50">
                        <ChartNoAxesCombined
                            size={28}
                            strokeWidth={1.7}
                            className="text-violet-600"
                        />
                    </div>

                    <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                        Estamos trabajando en las estadísticas
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        Estamos preparando esta sección para que puedas
                        consultar las ventas y el rendimiento de Zapi.
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        Próximamente
                    </span>
                </div>
            </main>
        </div>
    )
}
