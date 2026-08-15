import { useNavigate } from "react-router-dom";
import CartList from "../../cart/CartList";
import { Button } from "../../components/Button";
import { Barcode } from 'lucide-react';
import { List } from 'lucide-react';
import { CreditCard } from "lucide-react";
import Header from "../../components/Header";
import { useCart } from "../../cart/useCart";
import { useCheckout } from "../../hooks/useCheckout";
import { ErrorFeedback } from "../../components/feedback/ErrorFeedback";
import { Loading } from "../../components/feedback/Loading";

export const ViewCart = () => {

  const navigate = useNavigate()
  const { items } = useCart();
  const { checkout, loading, error } = useCheckout()

  const handlePay = async () => {

    //Solo pasamos los atributos que necesita el service
    const cartItems = items.map(item => {
      return {
        productId: item.id,
        quantity: item.quantity
      }
    })
    const url = await checkout(cartItems)
    if (url) window.location.href = url
  }

  if (error) return <ErrorFeedback text={error} />
  return (
    <>
      {/* Componente loading */}
      {loading && <Loading />}

      <div className="h-dvh flex flex-col items-center overflow-hidden">
        <Header title="Mi Carrito" />

        <CartList carrito={items} />

        <div className="w-full flex flex-col items-center gap-3 py-4 shrink-0 px-3">
          <div className="w-full flex flex-row items-center justify-center gap-3 min-w-0">
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
            <Button onClick={handlePay} className="flex items-center justify-center gap-2 w-full ">
              <CreditCard />Pagar
            </Button>
          )}
        </div>
      </div>
    </>

  );
};