
import { CalendarDays } from "lucide-react"

export type Period = "day" | "week" | "month" | "year"

interface PeriodFilterProps {
    value: Period
    onChange: (period: Period) => void
}

const periods = [
    { value: "day", label: "Hoy" },
    { value: "week", label: "Últimos 7 días" },
    { value: "month", label: "Este mes" },
    { value: "year", label: "Este año" },
]

const PeriodFilter = ({ value, onChange }: PeriodFilterProps) => {
    return (
        <div className="flex items-center justify-end gap-2">
            <CalendarDays
                size={18}
                className="text-gray-400"
            />

            <select
                value={value}
                onChange={(e) => onChange(e.target.value as Period)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
                {periods.map((period) => (
                    <option
                        key={period.value}
                        value={period.value}
                    >
                        {period.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default PeriodFilter

// Endpoint futuro:
// GET /api/statistics/summary?period=week
// GET /api/statistics/revenue?period=week
//
// Valores posibles:
// day | week | month | year
