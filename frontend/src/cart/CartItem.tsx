type Producto = {
  id: number;
  nombre: string;
  precio: number;
};

type Props = {
  producto: Producto;
};

function CartItem({ producto }: Props) {
  return (
    <li>
      {producto.nombre} - ${producto.precio}
    </li>
  );
}

export default CartItem;