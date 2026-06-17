import { useNavigate } from "react-router-dom";
import CartList from "../../cart/CartList";
import { Button } from "../../components/Button";
import { Plus } from 'lucide-react';
import Header from "../../components/Header";
import { useCart } from "../../cart/useCart";
const apiUrl = import.meta.env.VITE_API_URL
if (!apiUrl) {
    console.error("La variable de entorno VITE_API_URL no está definida");
}

export const ViewCart = () => {

  const navigate = useNavigate()
  const { items } = useCart();

  //Funcion para consumir el endpoint para pagar
  const pagar = async () => {
    const res = await fetch(`${apiUrl}/payment/create`, {
      method: "POST",
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <div className="flex flex-col items-center">

      <Header title="Mi Carrito" />

      <CartList
        carrito={items} />

      <div className="flex flex-col gap-3 mt-5">
        <Button variant="secundario" onClick={() => { navigate("/scan") }}><div className="flex justify-center gap-2"><Plus />Añadir Producto</div></Button>
        {items.length !== 0 &&
          <Button onClick={pagar}>Pagar</Button>
        }
      </div>
    </div>
  );
};