import { CreditCard } from "lucide-react";
import CartList from "../../cart/CartList";
import { useCart } from "../../cart/useCart";
import { Button } from "../../components/Button";
import { CameraView } from "../../scanner/CameraView";
import { useCheckout } from "../../hooks/useCheckout";
import { Loading } from "../../components/feedback/Loading";
import { ErrorModal } from "../../components/feedback/ErrorModal";

export const ViewScan = () => {

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

  return (
    <>
      {/* Componente loading */}
      {loading && <Loading />}

      <div className="h-dvh flex flex-col overflow-hidden">

        {/* Cámara */}
        <div className="w-full flex justify-center p-4">
          <div className="w-full max-w-md rounded-2xl overflow-hidden border-white/10 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
            <CameraView />
          </div>
        </div>

        {/* Cárrito */}
        <CartList carrito={items} mode="Scan" />

        {items.length !== 0 && (
          <div className="w-full flex flex-col items-center gap-3 py-4 shrink-0 px-3">
            <Button onClick={handlePay} className="flex items-center justify-center gap-2 w-full">
              <CreditCard />Pagar
            </Button>
          </div>

        )}
      </div>
      
      {/* Modal para advetir de un problema no mayor */}
      <ErrorModal error={error} />
    </>

  );


};