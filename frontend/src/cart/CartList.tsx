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
      <h2>Lista del carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {carrito.map((producto) => (
            <CartItem key={producto.id} producto={producto} />
          ))}
        </ul>
      )}

    </div>
  );
}

export default CartList;