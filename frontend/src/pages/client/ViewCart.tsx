import  CartList  from "../../cart/CartList";
import { Button } from "../../components/Button";

export const ViewCart = () => {
  return (
    <div className="flex flex-col items-center gap-10 mt-10">
      <CartList
        carrito={[
          {
            id: 1,
            nombre: "Coca Cola 500ml",
            precio: 1200,
          },
          {
            id: 2,
            nombre: "Galletas Oreo",
            precio: 950,
          },
          {
            id: 3,
            nombre: "Papas Lays",
            precio: 1100,
          },
        ]}
      />

      <div className="mt-6 flex flex-col gap-5">
        <Button>Añadir Producto</Button>
        <Button>Pagar</Button>
      </div>
    </div>
  );
};