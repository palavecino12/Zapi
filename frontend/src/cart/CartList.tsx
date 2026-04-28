import CartItem from "./CartItem";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
};

type Props = {
  carrito: Producto[];
};

function CartList({ carrito }: Props) {
  return (
    <div className="flex flex-col h-[75vh]">
      
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-10">
          {carrito.map((producto) => (
            <CartItem
              key={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
            />
          ))}
        </div>
      )}

      <p className="border-b border-t border-black/30 p-2 pl-8 shadow-lg">
        total:
      </p>

    </div>
  );
}

export default CartList;