//Type de las estadisticas tal como las recibimos del back

export interface RevenueByDay {
    date: string;
    total: number;
}

export interface TopProduct {
    name: string;
    quantity: number;
}

export interface Statistics {
    totalSales: number;
    totalRevenue: number;
    revenueByDay: RevenueByDay[];
    topProducts: TopProduct[];
}
