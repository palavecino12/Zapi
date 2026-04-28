import ProductDetails from "./components/ProductDetails";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const ViewInfo = () => {
  const navigate=useNavigate()

  return (
  <div className="flex flex-col items-center mt-50 gap-6">

    {/* Card */}
    <ProductDetails nombre="galletas Oreo" precio={1000} />

    {/* Botones */}
    <div className="flex flex-col gap-3 mt-50">

        <Button onClick={()=>{navigate("/cart")}} variant="primario">Añadir</Button>
        <Button onClick={()=>{navigate("/")}} variant="secundario">Cancelar</Button>

    </div>

  </div>
  );
};

export default ViewInfo;