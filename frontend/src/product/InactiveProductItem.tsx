
import { RotateCcw, Trash2 } from "lucide-react";
import type { Product } from "../types/productType";

interface InactiveProductItemProps {
    product: Product;
    onActivate: (code: string) => void;
}

export function InactiveProductItem({ product, onActivate }: InactiveProductItemProps) {
    return (
        <div className="px-2 py-1">
            <div className="flex flex-row items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-md">

                {/* Nombre del producto */}
                <h2 className="flex-1 truncate text-base font-semibold text-gray-800">
                    {product.name}
                </h2>

                {/* Precio del producto */}
                <div className="w-16 shrink-0 text-left">
                    <p className="text-base font-bold text-violet-600">
                        ${product.price.toLocaleString()}
                    </p>
                </div>

                <div className="flex gap-1">
                    {/* Botón para restaurar */}
                    <div className="flex gap-1">
                        <button
                            type="button"
                            onClick={() => onActivate(product.code)}
                            title="Restaurar producto"
                            aria-label={`Restaurar ${product.name}`}
                            className="rounded-xl bg-violet-100 p-2 text-violet-700 shadow-sm transition-all duration-200 active:bg-violet-600 active:text-white active:shadow-inner"
                        >
                            <RotateCcw size={22} strokeWidth={1.8} />
                        </button>
                    </div>
                    {/* Eliminar */}

                    <button
                        onClick={()=>console.log("en proceso")}
                        aria-label="Eliminar producto"
                        className="rounded-xl bg-red-100 p-2 text-red-600 shadow-sm transition-all duration-200 active:bg-red-600 active:text-white active:shadow-inner"
                    >
                        <Trash2 size={22} strokeWidth={1.8} />
                    </button>

                </div>


            </div>
        </div>
    );
}
