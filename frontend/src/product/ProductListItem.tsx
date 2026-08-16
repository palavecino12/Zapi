//Este componente se va a usar para mostrar cada producto de la base de datos.

import type { Product } from "../types/productType"

type ProductListItemProps = {
    product: Product;
    selected: boolean;
    onAdd: (product: Product) => void;
    onRemove: (id: number) => void;
}

export const ProductListItem = ({ product, onAdd, onRemove, selected }: ProductListItemProps) => {

    return (
        <div className="px-2 py-1">
            <div className="flex flex-row items-center border border-gray-300 bg-white shadow-xl p-2 rounded-xl">

                {/* Nombre del producto */}
                <h2 className="flex-1 text-black/90 text-lg font-semibold">{product.name}</h2>

                {/* Precio del producto */}
                <div className="w-24 text-left shrink-0">
                    <p className="text-violet-600 text-lg font-semibold">
                        ${product.price.toLocaleString()}
                    </p>
                </div>


                {/* Boton para añadir o quitar producto */}
                <button
                    className={`h-10 w-16 text-white rounded-lg ${selected ?"bg-red-600/80":"bg-violet-600"}`}
                    onClick={() =>
                        selected
                            ? onRemove(product.id)
                            : onAdd(product)
                    }
                >
                    {selected ? "Quitar" : "Añadir"}
                </button>

            </div>
        </div>
    )
}