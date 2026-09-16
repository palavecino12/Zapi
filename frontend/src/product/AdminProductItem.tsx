// src/components/product/AdminProductItem.tsx

import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "../types/productType";

type AdminProductItemProps = {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
};

export const AdminProductItem = ({ product, onEdit, onDelete }: AdminProductItemProps) => {
    return (
        <div className="px-2 py-1">
            <div className="flex flex-row items-center border border-gray-300 bg-white shadow-xl p-2 rounded-xl gap-2">

                {/* Nombre del producto */}
                <h2 className="flex-1 text-black/90 text-lg font-semibold truncate">
                    {product.name}
                </h2>

                {/* Precio del producto */}
                <div className="w-24 text-left shrink-0">
                    <p className="text-violet-600 text-lg font-semibold">
                        ${product.price.toLocaleString()}
                    </p>
                </div>

                <div className="flex gap-1">
                    {/* Boton para editar */}
                    <button
                        onClick={() => onEdit(product)}
                        className="bg-gray-200 p-2 text-[#2c2c28] rounded-xl shadow-lg transition-all duration-200
                            active:bg-[#747470] active:text-white active:shadow-inner"><Pencil size={22} /></button>

                    {/* Boton para eliminar */}
                    <button
                        onClick={() => onDelete(product.id)}
                        className="bg-[#f8d6d6] p-2 text-[#b42c2c] rounded-xl shadow-lg transition-all duration-200
                            active:bg-[#cf7777] active:text-white active:shadow-inner"><Trash2 size={22} /></button>
                </div>

            </div>
        </div>
    );
};