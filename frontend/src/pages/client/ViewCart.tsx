import { useNavigate } from "react-router-dom";
import CartList from "../../cart/CartList";
import { Button } from "../../components/Button";
import { Plus } from 'lucide-react';
import Header from "../../components/Header";
import { useCart } from "../../cart/useCart";
import { createPayment } from "../../services/paymentServices";

export const ViewCart = () => {

  const navigate = useNavigate()
  const { items } = useCart();

  const pagar = async () => {
    try {

      //Solo pasamos los atributos que necesita el service
      const paymentItems = items.map(item => {
        return {
          id: item.id,
          quantity: item.quantity
        }
      })
      const { url } = await createPayment(paymentItems);
      window.location.href = url;

    } catch (error) {

      console.log(error)
      //Cuando esten los hooks usamos los estados
    }

  };

  return (
    <div className="h-dvh flex flex-col items-center overflow-hidden">
      <Header title="Mi Carrito" />

      <CartList carrito={items} />

      <div className="w-full flex flex-col items-center gap-3 py-4 shrink-0">
        <Button variant="primario" onClick={() => navigate("/scan")}>
          <div className="flex justify-center gap-2"><Plus />Añadir Producto</div>
        </Button>

        <Button variant="secundario" onClick={() => navigate("/list")}>
          Ver Lista
        </Button>

        {items.length !== 0 && (
          <Button onClick={pagar}>
            Pagar
          </Button>
        )}
      </div>
    </div>
  );
};