import CartItem from "./CartItem";
import type { CartItemType } from "../types/productType";
import { CartEmpty } from "../components/CartEmpty";
import { ScanInstruction } from "../components/ScanInstruction";

type Props = {
  carrito: CartItemType[];
  mode?: "Cart" | "Scan"
};

function CartList({ carrito, mode = "Cart" }: Props) {

  const total = carrito.reduce(
    (acumulador, producto) =>
      acumulador + (producto.price * producto.quantity),
    0
  );

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 ">
      {carrito.length === 0 ? (
        mode === "Cart"
          ? <CartEmpty />
          : <div className="flex-1 flex items-center"><ScanInstruction /></div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 ">
            {carrito.map((producto) => (
              <CartItem key={producto.id} product={producto} />
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