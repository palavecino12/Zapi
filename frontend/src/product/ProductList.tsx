
import type { ReactNode } from "react";
import type { Product } from "../types/productType";

// Componente genérico para listar productos.
interface ProductListProps {
    products: Product[];
    renderItem: (product: Product) => ReactNode;
    emptyMessage?: string;
}

export const ProductList = ({ products, renderItem, emptyMessage = "No se encontraron productos." }: ProductListProps) => {
    return (
        <div className="flex w-full flex-col">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id}>
                        {renderItem(product)}
                    </div>
                ))
            ) : (
                <p className="py-8 text-center text-sm text-gray-500">
                    {emptyMessage}
                </p>
            )}
        </div>
    );
};
