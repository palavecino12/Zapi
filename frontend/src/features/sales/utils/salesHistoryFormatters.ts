const TIME_ZONE = "America/Argentina/Mendoza";

// Obtiene la fecha YYYY-MM-DD en Argentina.
const getDateKey = (date: Date) => {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(date);

    const year = parts.find(part => part.type === "year")!.value;
    const month = parts.find(part => part.type === "month")!.value;
    const day = parts.find(part => part.type === "day")!.value;

    return `${year}-${month}-${day}`;
};

// Devuelve Hoy, Ayer o la fecha completa.
export const formatDateLabel = (date: string) => {
    const today = getDateKey(new Date());

    const yesterdayDate = new Date(`${today}T00:00:00Z`);
    yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);

    const yesterday = yesterdayDate.toISOString().slice(0, 10);

    if (date === today) return "Hoy";
    if (date === yesterday) return "Ayer";

    return new Intl.DateTimeFormat("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: TIME_ZONE,
    }).format(new Date(`${date}T12:00:00Z`));
};

// Formatea importes en pesos argentinos.
export const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 2,
    }).format(Number(amount));
};

// Formatea la hora de una venta.
export const formatTime = (date: string) => {
    return new Intl.DateTimeFormat("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: TIME_ZONE,
    }).format(new Date(date));
};