
export interface DailySales {
  date: string;
  revenue: number;
  sales: number;
  units: number;
}

const dailyValues = [
  [12000, 8, 18],
  [18500, 11, 25],
  [22000, 14, 31],
  [15000, 9, 20],
  [28000, 17, 39],
  [31500, 19, 42],
  [9000, 6, 13],
  [14000, 9, 19],
  [24500, 15, 34],
  [19500, 12, 27],
  [35000, 21, 48],
  [28000, 16, 36],
  [17500, 10, 22],
  [11000, 7, 15],
  [40200, 24, 53],
  [36500, 22, 49],
  [45300, 27, 61],
  [39500, 23, 54],
  [21000, 13, 29],
  [33000, 20, 44],
];

export const salesByDate: DailySales[] = dailyValues.map(
  ([revenue, sales, units], index) => ({
    date: `2026-11-${String(index + 1).padStart(2, "0")}`,
    revenue,
    sales,
    units,
  })
);
