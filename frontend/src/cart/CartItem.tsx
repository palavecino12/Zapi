import { Trash2 } from 'lucide-react';
import { useCart } from "./useCart";
import type { CartItemType } from "../types/product.types";


type CartItemProps = {
  product: CartItemType
};

const Cartitem = ({ product }: CartItemProps) => {

  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="w-screen px-2" data-aos="zoom-in" >
      <div className="rounded-2xl overflow-hidden bg-gray-200 border border-black/20 w-full">

        {/* Parte superior */}
        <div className="bg-white p-1 flex items-center justify-between">

          {/* Nombre del producto */}
          <h2 className="text-black/90 text-xl font-bold ml-2">
            {product.name}
          </h2>

          {/* boton para eliminar producto */}
          <button onClick={() => removeItem(product.id)}
            className="h-10 w-10 mr-2 flex items-center justify-center bg-gray-100  
                  rounded-lg shadow-xl active:bg-gray-400 active:scale-95 active:shadow-none active:text-white">
            <Trash2 color="black" />
          </button>

        </div >

        {/* Parte inferior */}
        < div className="bg-white p-2 flex items-center justify-between" >

          {/* Precio del producto */}
          <p className="text-violet-600 text-lg font-bold ml-2">
            Precio: ${(product.price * product.quantity).toLocaleString()}
          </p>

          {/* Controles */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3 mr-2">

              {/* Boton restar */}
              <button
                onClick={() => updateQuantity(product.id, "decrement")}
                className="h-10 w-10 flex items-center justify-center text-xl font-bold border 
                  border-gray-400 rounded-lg  shadow-lg active:bg-gray-400 active:scale-95 active:shadow-none active:text-white">-
              </button>

              {/* Cantidad */}
              <p className="text-black text-lg">{product.quantity}</p>

              {/* Boton sumar */}
              <button
                onClick={() => updateQuantity(product.id, "increment")}
                className="text-white h-10 w-10 flex items-center justify-center text-xl font-bold bg-violet-600 bordertext-white rounded-lg shadow-lg 
              transition-all duration-150 hover:bg-violet-700 active:bg-violet-800 active:scale-95 active:shadow-none">+

              </button>
            </div>
          </div >
        </div >
      </div >
    </div >
  );
};

export default Cartitem;

