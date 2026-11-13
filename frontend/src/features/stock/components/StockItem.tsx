
import { Check, Plus } from "lucide-react";
import type { Product } from "../../../features/products/types/productType";

type StockItemProps = {
    product: Product;
    isEditing: boolean;
    amount: string;
    onAmountChange: (value: string) => void;
    onAdd: () => void;
    onConfirm: () => void;
};

export function StockItem({ product, isEditing, amount, onAmountChange, onAdd, onConfirm, }: StockItemProps) {
    return (
        <li className="px-2 py-1">
            <div className="flex flex-row items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-md">

                {/* Nombre del producto */}
                <h2 className="flex-1 truncate text-base font-semibold text-gray-800">
                    {product.name}
                </h2>

                {/* Stock */}
                <div className="w-24 shrink-0 text-left">
                    <p className={`text-base font-bold ${product.stock === 0 ? "text-red-500" : "text-violet-600"
                        }`}>
                        Stock: {product.stock}
                    </p>
                </div>

                {/* Botón agregar stock */}
                <div className="flex shrink-0 gap-1">

                    {isEditing ? (
                        <>
                            <input
                                type="number"
                                inputMode="numeric"
                                autoFocus
                                min={1}
                                placeholder="Cant."
                                value={amount}
                                onChange={(e) => onAmountChange(e.target.value)}
                                aria-label={`Cantidad a agregar a ${product.name}`}
                                className="h-10 w-16 rounded-xl border border-violet-300 bg-violet-50 px-2 text-center text-base font-semibold text-violet-700 outline-none focus:border-violet-600"
                            />

                            {/* Confirmar */}
                            <button
                                type="button"
                                onClick={onConfirm}
                                aria-label="Confirmar"
                                className="touch-manipulation rounded-xl bg-violet-600 p-2 text-white shadow-base transition-all duration-200 active:bg-violet-700 active:shadow-inner"
                            >
                                <Check size={22} strokeWidth={1.8} />
                            </button>
                        </>
                    ) : (
                        /* Agregar */
                        <button
                            type="button"
                            onClick={onAdd}
                            aria-label={`Agregar stock a ${product.name}`}
                            className="touch-manipulation rounded-xl bg-violet-100 p-2 text-violet-700 shadow-base transition-all duration-200 active:bg-violet-600 active:text-white active:shadow-inner"
                        >
                            <Plus size={22} strokeWidth={1.8} />
                        </button>
                    )}

                </div>
            </div>
        </li>
    );
}
