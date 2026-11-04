import type { Product } from "../types/productType";

type ReviewStockItemProps = {
    product: Product;
    amount: string;
    onAmountChange: (value: string) => void;
};

export function ReviewStockItem({
    product,
    amount,
    onAmountChange,
}: ReviewStockItemProps) {
    return (
        <li className="px-2 py-1">
            <div className="flex flex-row items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-md">

                <div className="min-w-0 flex-1">
                    <h2 className="truncate text-base font-semibold text-gray-800">
                        {product.name}
                    </h2>

                    <p
                        className={`text-sm font-semibold ${
                            product.stock === 0 ? "text-red-500" : "text-violet-600"
                        }`}
                    >
                        Stock actual: {product.stock}
                    </p>
                </div>

                <input
                    type="number"
                    inputMode="numeric"
                    autoFocus={false}
                    min={0}
                    placeholder="Cant."
                    value={amount}
                    onChange={(e) => onAmountChange(e.target.value)}
                    aria-label={`Stock revisado de ${product.name}`}
                    className="h-10 w-20 shrink-0 rounded-xl border border-violet-300 bg-violet-50 px-2 text-center text-base font-semibold text-violet-700 outline-none focus:border-violet-600"
                />

            </div>
        </li>
    );
}