import { Trash2 } from 'lucide-react';
import { useCart } from "./useCart";
import type { CartItemType } from "../types/productType";


type CartItemProps = {
  product: CartItemType
};


const Cartitem = ({ product }: CartItemProps) => {

  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="w-screen px-2" data-aos="zoom-in">

      <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md w-full">

        <div className="p-2 flex items-center gap-3 min-w-0">

          {/* Nombre del producto */}
          <h2 className="text-black/90 text-lg font-bold flex-1 min-w-0 truncate">
            {product.name}
          </h2>


          {/* Precio */}
          <p className="text-violet-600 text-lg font-bold whitespace-nowrap">
            ${(
              product.price * product.quantity
            ).toLocaleString()}
          </p>


          {/* Controles */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Boton restar */}
            <button
              onClick={() => updateQuantity(product.id, "decrement")}
              className=" h-9 w-9 flex items-center justify-center text-lg font-bold border border-gray-400 rounded-lg shadow-md transition-all duration-150 hover:bg-gray-100 active:bg-gray-400 active:scale-95 active:shadow-none active:text-white">
              -
            </button>


            {/* Cantidad */}
            <p className="text-black text-lg font-semibold min-w-[20px] text-center">
              {product.quantity}
            </p>


            {/* Boton sumar */}
            <button onClick={() => updateQuantity(product.id, "increment")} className="h-9 w-9 flex items-center justify-center text-lg font-bold text-white bg-violet-600 rounded-lg shadow-md transition-all duration-150 hover:bg-violet-700 active:bg-violet-800 active:scale-95 active:shadow-none">+</button>


            {/* Boton eliminar */}
            <button onClick={() => removeItem(product.id)} className="h-9 w-9 flex items-center justify-center bg-gray-100 rounded-lg shadow-md transition-all duration-150 hover:bg-gray-200 active:bg-gray-400 active:scale-95 active:shadow-none active:text-white"><Trash2 size={18} color="black" /></button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Cartitem;