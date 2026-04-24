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
    <div>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div className="flex flex-col gap-4 flex-wrap">
          {carrito.map((producto) => (
            <CartItem
              key={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CartList;