import ProductDetails from "./components/ProductDetails";
import { Button } from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import type { Product } from "../../types/product.types";

const ViewInfo = () => {

  const navigate = useNavigate()
  const location = useLocation();

  const product = location.state?.product as Product;


  return (
    <div className="flex flex-col items-center mt-50 gap-6">

      {/* Card */}
      <ProductDetails nombre={product.name} precio={product.price} />

      {/* Botones */}
      <div className="flex flex-col gap-3 mt-50">

        <Button onClick={() => { navigate("/cart") }} variant="primario">Añadir</Button>
        <Button onClick={() => { navigate("/") }} variant="secundario">Cancelar</Button>

      </div>

    </div>
  );
};

export default ViewInfo;