import CartList from "../../cart/CartList";
import { useCart } from "../../cart/useCart";
import { CameraView } from "../../scanner/CameraView";

export const ViewScan = () => {

  const { items } = useCart();

  return (
    <div className="h-dvh flex flex-col overflow-hidden">

      {/* Cámara */}
      <div className="w-full flex justify-center p-4">
        <div className="w-full max-w-md rounded-2xl overflow-hidden border-white/10 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
          <CameraView />
        </div>
      </div>

      {/* Cárrito */}
      <CartList carrito={items} mode="Scan" />
    </div>
  );
};