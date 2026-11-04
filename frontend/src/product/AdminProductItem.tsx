
import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "../types/productType";

type AdminProductItemProps = {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
};

export const AdminProductItem = ({
    product,
    onEdit,
    onDelete,
}: AdminProductItemProps) => {
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

                {/* Botones de acción */}
                <div className="flex gap-1">

                    {/* Editar */}
                    <button
                        onClick={() => onEdit(product)}
                        aria-label="Editar producto"
                        className="rounded-xl bg-violet-100 p-2 text-violet-700 shadow-sm transition-all duration-200 active:bg-violet-600 active:text-white active:shadow-inner"
                    >
                        <Pencil size={22} strokeWidth={1.8} />
                    </button>

                    {/* Eliminar */}
                    <button
                        onClick={() => onDelete(product.id)}
                        aria-label="Eliminar producto"
                        className="rounded-xl bg-red-100 p-2 text-red-600 shadow-sm transition-all duration-200 active:bg-red-600 active:text-white active:shadow-inner"
                    >
                        <Trash2 size={22} strokeWidth={1.8} />
                    </button>

                </div>
            </div>
        </div>
    );
};
