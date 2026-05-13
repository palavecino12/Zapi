import CartItem from "./CartItem";
import type { CartItemType } from "../types/product.types";

type Props = {
  carrito: CartItemType[];
};

function CartList({ carrito }: Props) {

  const total = carrito.reduce(
    (acumulador, producto) => acumulador + (producto.price*producto.quantity),0
  );

  return (
    <div className="flex flex-col h-[75vh]">
      {carrito.length === 0 ? (
        <div className="flex flex-col justify-center h-full items-center">
          <img src="/cart-empty.png" alt="Carrito"/>
          <h2 className="font-medium text-2xl">Tu carrito está vacío</h2>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-10">
            {carrito.map((producto) => (
              <CartItem
                key={producto.id}
                product={producto}
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