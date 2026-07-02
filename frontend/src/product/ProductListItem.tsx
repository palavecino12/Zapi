import type { Product } from "../types/product.types"

type props = {
    product: Product;
    selected: boolean;
    onAdd: (product: Product) => void;
    onRemove: (id:number) => void;
}

export const ProductListItem = ({ product, onAdd, onRemove, selected }: props) => {
    return (
        <div className="rounded-2xl p-3">
            <div className="flex flex-row border shadow-xl justify-between p-3">
                
                <h2 className="">{product.name}</h2>

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