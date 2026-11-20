// Datos que enviamos al backend.
export interface ReviewStockInputDTO {
    products: {
        code: string;
        physicalStock: number;
    }[];
}

// Resultado de la revisión de cada producto.
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

// Respuesta completa del backend.
export interface ReviewStockDTO {
    message: string;
    results: ReviewStockResult[];
}