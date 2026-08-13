import { Trash2 } from 'lucide-react';
import { useCart } from "./useCart";
import type { CartItemType } from "../types/productType";

type CartItemProps = {
  product: CartItemType;
};

const Cartitem = ({ product }: CartItemProps) => {

  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="w-screen px-2" data-aos="zoom-in">

      <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md w-full">

        <div className="p-2 pr-0 flex items-stretch gap-2">

          {/* Contenido */}
          <div className="flex-1 min-w-0 flex flex-col gap-0.5">

            {/* Nombre */}
            <div className="flex items-center min-w-0">

              <h2 className="text-black/90 text-lg font-bold min-w-0 truncate">
                {product.name}
              </h2>

            </div>

            {/* Precio + controles */}
            <div className="flex items-center justify-between">

              {/* Precio */}
              <p className="text-violet-600 text-lg font-bold whitespace-nowrap">
                ${(product.price * product.quantity).toLocaleString()}
              </p>

              {/* Controles */}
              <div className="flex items-center gap-1.5">

                {/* Restar */}
                <button
                  onClick={() => updateQuantity(product.id, "decrement")}
                  className="h-10 w-10 flex items-center justify-center text-base font-bold border border-gray-400 rounded-lg shadow-md transition-all duration-150 active:bg-gray-400 active:scale-95 active:shadow-none active:text-white"
                >
                  -
                </button>

                {/* Cantidad */}
                <p className="text-black text-base font-semibold min-w-[18px] text-center">
                  {product.quantity}
                </p>

                {/* Sumar */}
                <button
                  onClick={() => updateQuantity(product.id, "increment")}
                  className="h-10 w-10 flex items-center justify-center text-base font-bold text-white bg-violet-600 rounded-lg shadow-md transition-all duration-150 active:bg-violet-800 active:scale-95 active:shadow-none"
                >
                  +
                </button>

              </div>
            </div>

          </div>

          {/* Botón eliminar */}
          <button
            onClick={() => removeItem(product.id)}
            className="w-10 shrink-0 mr-2 flex items-center justify-center text-white bg-red-500/70 rounded-lg shadow-md transition-all duration-150 active:bg-red-700 active:scale-95 active:shadow-none"
          >
            <Trash2 size={16} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default Cartitem;