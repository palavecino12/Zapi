
import type { Product } from "../types/productType";

type ProductListItemProps = {
    product: Product;
    selected: boolean;
    onAdd: (product: Product) => void;
    onRemove: (id: number) => void;
};

export const ProductListItem = ({
    product,
    onAdd,
    onRemove,
    selected,
}: ProductListItemProps) => {
    return (
        <div className="px-2 py-1">
            <div className="flex flex-row items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-md">

                {/* Nombre del producto */}
                <h2 className="min-w-0 flex-1 truncate text-base font-semibold text-gray-800">
                    {product.name}
                </h2>

                {/* Precio del producto */}
                <div className="w-16 shrink-0 text-left">
                    <p className="text-base font-bold text-violet-600">
                        ${product.price.toLocaleString()}
                    </p>
                </div>

                {/* Botón añadir o quitar */}
                <button
                    type="button"
                    onClick={() =>
                        selected
                            ? onRemove(product.id)
                            : onAdd(product)
                    }
                    className={`flex h-10 w-[76px] shrink-0 touch-manipulation items-center justify-center rounded-xl p-2 text-sm font-semibold shadow-sm transition-all duration-200 active:shadow-inner ${
                        selected
                            ? "bg-red-200 text-red-700 active:bg-red-600 active:text-white"
                            : "bg-violet-100 text-violet-700 active:bg-violet-600 active:text-white"
                    }`}
                >
                    {selected ? "Quitar" : "Añadir"}
                </button>

            </div>
        </div>
    );
};
