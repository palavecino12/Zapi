import CartItem from "./CartItem";
import { ShoppingCart } from "lucide-react";
import type { Producto } from "../types/product.types";

type Props = {
  carrito: Producto[];
};

function CartList({ carrito }: Props) {

  const total = carrito.reduce(
    (acumulador, producto) => acumulador + producto.precio,0
  );

  return (
    <div className="flex flex-col h-[75vh]">
      {carrito.length === 0 ? (
        <div className="flex flex-col justify-center h-full items-center">
          <ShoppingCart size={170} strokeWidth={0.8} />
          <h2>El carrito esta vacio</h2>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-10">
            {carrito.map((producto) => (
              <CartItem
                key={producto.id}
                nombre={producto.nombre}
                precio={producto.precio}
              />
            ))}
          </div>

          <p className="border-b border-t border-black/30 p-3 pl-8 shadow-lg">
            Total: ${total}
          </p>
        </>
      )}
    </div>
  );
}

export default CartList;