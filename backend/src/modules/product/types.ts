export interface ReviewStockResult {
    product: {
        code: string;
        name: string;
    };
    databaseStock: number;
    physicalStock: number;
    difference: number;
    status: "correct" | "missing" | "surplus";
}

//Esta es la respuesta que retornamos al front
export interface ReviewStockDTO {
    message: string;
    results: ReviewStockResult[];
}

//Esto es lo que recibimos del front
export interface ReviewStockInputDTO {
    products: {
        code: string;
        physicalStock: number;
    }[];
}