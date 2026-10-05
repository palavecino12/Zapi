//Servicio de las estadisticas encargado de comunicarse con la API del backend
import type { Statistics } from "../types/statisticsType"

const apiUrl = import.meta.env.VITE_API_URL
if (!apiUrl) {
    console.error("La variable de entorno VITE_API_URL no está definida");
}

//Service para traer las estadisticas de ventas
export const getStatistics = async (): Promise<Statistics> => {
    const url = `${apiUrl}/sales/statistics`

    const response = await fetch(url)

    if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message || "Error desconocido al obtener las estadísticas")
    }

    const statistics: Statistics = await response.json();

    return statistics;
}
