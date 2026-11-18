export interface ReviewStockResult {
    code: string;
    databaseStock: number;
    physicalStock: number;
    difference: number;
    status: "correct" | "missing" | "surplus";
}

export interface ReviewStockDTO {
    message: string;
    results: ReviewStockResult[];
}