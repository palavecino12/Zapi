import { useNavigate } from "react-router-dom";
import CartList from "../../cart/CartList";
import { Button } from "../../components/Button";
import { Barcode } from 'lucide-react';
import { List } from 'lucide-react';
import { CreditCard } from "lucide-react";
import Header from "../../components/Header";
import { useCart } from "../../cart/useCart";
import { createCheckout } from "../../services/saleServices";

export const ViewCart = () => {

  const navigate = useNavigate()
  const { items } = useCart();

  const pagar = async () => {
    try {

      //Solo pasamos los atributos que necesita el service
      const cartItems = items.map(item => {
        return {
          productId: item.id,
          quantity: item.quantity
        }
      })
      const { url } = await createCheckout(cartItems);
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

      <div className="w-full flex flex-col items-center gap-3 py-4 shrink-0 px-3">
        <div className="w-full flex flex-row items-center justify-center gap-2 min-w-0">
          <Button variant="secundario" onClick={() => navigate("/list")}>
            <div className="flex items-center justify-center gap-2">
              <List />Ver Lista
            </div>
          </Button>

          <Button variant="primario" onClick={() => navigate("/scan")}>
            <div className="flex items-center justify-center gap-2">
              <Barcode />Escanear
            </div>
          </Button>
        </div>

        {items.length !== 0 && (
          <Button onClick={pagar} className="flex items-center justify-center gap-2 w-full ">
              <CreditCard />Pagar
          </Button>
        )}
      </div>
    </div>
  );
};