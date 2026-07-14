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
        <div className="rounded-2xl p-3">
            <div className="flex flex-row border shadow-xl justify-between p-3">

                {/* Nombre del producto */}
                <h2 className="">{product.name}</h2>

                {/* Precio del producto */}
                <p className="text-violet-600 font-semibold">
                    ${product.price.toLocaleString()}
                </p>

                {/* Boton para añadir o quitar producto */}
                <button
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