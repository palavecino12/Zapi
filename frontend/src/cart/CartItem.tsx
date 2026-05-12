import { Trash2 } from 'lucide-react';
import { useCart } from "./useCart";
import type { CartItemType } from "../types/product.types";

type CartItemProps = {
  product: CartItemType
};

const Cartitem = ({ product }: CartItemProps) => {

  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="w-screen px-2">

      <div className="rounded-2xl overflow-hidden shadow-2xl border border-black/20 w-full">

        {/* Parte superior */}
        <div className="bg-gray-100 p-2 flex items-center justify-between">

          <h2 className="text-orange-500 text-2xl font-semibold ml-4">
            {product.name}
          </h2>

          {/* boton para eliminar producto */}
          <button onClick={() => removeItem(product.id)}
            className="h-10 w-10 mr-2 flex items-center justify-center bg-linear-to-r from-orange-500 to-orange-700 border 
                  border-black/10 rounded-lg shadow-xl active:scale-95 active:shadow-none">
            <Trash2 color="white" />
          </button>

        </div>

        {/* Parte inferior */}
        <div className="bg-gray-100 p-2 flex items-center justify-between">

          <p className="text-black/70 text-xl font-bold ml-4">
            Precio: ${(product.price * product.quantity).toLocaleString()}
          </p>

          {/* Controles */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3 mr-2">
              <button
                onClick={()=>updateQuantity(product.id,"decrement")}
                className="text-orange-500 h-10 w-10 flex items-center justify-center text-xl font-bold border 
                  border-orange-500 rounded-lg  shadow-lg active:scale-95 active:shadow-none">-
              </button>

              <p className="text-black text-lg">{product.quantity}</p>

              <button
                onClick={()=>updateQuantity(product.id,"increment")}
                className="h-10 w-10 flex items-center justify-center text-xl font-bold bg-linear-to-r from-orange-400 to-orange-600 border 
                  text-white border-black/10 rounded-lg shadow-lg active:scale-95 active:shadow-none">+
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cartitem;

