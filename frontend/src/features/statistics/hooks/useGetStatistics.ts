import { useState, useEffect } from "react"
import { getStatistics } from "../services/statisticsServices"
import type { Statistics } from "../types/statisticsType"

export const useGetStatistics = () => {
    const [statistics, setStatistics] = useState<Statistics | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchStatistics = async () => {
            setLoading(true)
            setError(null)

            try {
                const data = await getStatistics()
                setStatistics(data)
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Lo sentimos, tuvimos un problema al traer las estadísticas'
                setError(message)
            } finally {
                setLoading(false)
            }
        }

        fetchStatistics()
    }, [])

    return { statistics, loading, error }
}
