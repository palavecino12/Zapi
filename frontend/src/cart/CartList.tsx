import CartItem from "./CartItem";
import type { CartItemType } from "../types/productType";

type Props = {
  carrito: CartItemType[];
};

function CartList({ carrito }: Props) {

  const total = carrito.reduce(
    (acumulador, producto) =>
      acumulador + (producto.price * producto.quantity),
    0
  );


  return (
    <div className="flex-1 w-full flex flex-col min-h-0 ">
      {carrito.length === 0 ? (
        <div className=" flex-1 flex flex-col justify-center items-center gap-6 pb-6 ">
          <img src="/cart-empty.png" alt="Carrito" className=" w-[65vw] max-w-[330px] h-auto " />
          <h2 className=" font-medium text-2xl text-center ">
            Tu carrito está vacío
          </h2>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 ">
            {carrito.map((producto) => (
              <CartItem
                key={producto.id}
                product={producto}
              />
            ))}

          </div>
          <p className=" border-y border-black/30 p-3 font-bold shadow-lg ">  
            Total: ${total}
          </p>
        </>
      )}
    </div>
  );
}
export default CartList;