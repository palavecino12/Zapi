import { useNavigate } from "react-router-dom";
import CartList from "../../cart/CartList";
import { Button } from "../../components/Button";
import { Plus } from 'lucide-react';
import Header from "../../components/Header";
import type { Product } from "../../types/product.types";

export const ViewCart = () => {
  const navigate = useNavigate()

  //Funcion para consumir el endpoint para pagar
  const pagar = async () => {
    const res = await fetch("http://localhost:3000/payment/create", {
      method: "POST",
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  //Variable de simulacion hasta que se complete el back
  const carrito: Product[] = [
    {
      id: 1,
      code: "779089500001",
      name: "Coca Cola 500ml",
      price: 1200,
      stock: 1,
      createdAt: "2026-05-09T00:00:00.000Z",
    },
    {
      id: 2,
      code: "779089500002",
      name: "Galletas Oreo",
      price: 950,
      stock: 1,
      createdAt: "2026-05-09T00:00:00.000Z",
    },
    {
      id: 3,
      code: "779089500003",
      name: "Papas Lays",
      price: 1100,
      stock: 1,
      createdAt: "2026-05-09T00:00:00.000Z",
    },
    {
      id: 4,
      code: "779089500004",
      name: "Papas Lays",
      price: 1100,
      stock: 1,
      createdAt: "2026-05-09T00:00:00.000Z",
    },
    {
      id: 5,
      code: "779089500005",
      name: "Papas Lays",
      price: 1100,
      stock: 1,
      createdAt: "2026-05-09T00:00:00.000Z",
    },
    {
      id: 6,
      code: "779089500006",
      name: "Papas Lays",
      price: 1100,
      stock: 1,
      createdAt: "2026-05-09T00:00:00.000Z",
    },
  ]

  return (
    <div className="flex flex-col items-center">

      <Header title="Mi Carrito" />

      <CartList
        carrito={carrito} />

      <div className="flex flex-col gap-3 mt-5">
        <Button variant="secundario" onClick={() => { navigate("/scan") }}><div className="flex justify-center gap-2"><Plus />Añadir Producto</div></Button>
        {carrito.length !== 0 &&
          <Button onClick={pagar}>Pagar</Button>
        }
      </div>
    </div>
  );
};