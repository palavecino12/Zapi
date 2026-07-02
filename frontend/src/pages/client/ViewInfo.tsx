import ProductDetails from "./components/ProductDetails";
import { Button } from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import type { CartItemType} from "../../types/product.types";
import { useCart } from "../../cart/useCart";

const ViewInfo = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const { addItem } = useCart();

  const product = location.state?.product as CartItemType;

  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-6 px-4 ">
      <ProductDetails 
        nombre={product.name} 
        precio={product.price} 
      />
      <div className="flex flex-col items-center gap-3 w-full max-w-sm">
        <Button 
          onClick={() => {addItem(product)
            navigate("/cart")}} variant="primario">
          Añadir
        </Button>
        <Button 
          onClick={() => navigate("/")} variant="secundario">
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default ViewInfo;