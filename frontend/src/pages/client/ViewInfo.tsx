import ProductDetails from "./components/ProductDetails";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const ViewInfo = () => {
  const navigate=useNavigate()

  return (
  <div className="flex flex-col items-center mt-20 gap-6">

    {/* Card */}
    <ProductDetails nombre="Oreo" precio={1000} />

    {/* Botones */}
    <div className="flex gap-1 mt-50">

        <Button onClick={()=>{navigate("/")}} variant="secundario">Cancelar</Button>

        <Button onClick={()=>{navigate("/cart")}} variant="primario">Añadir</Button>

    </div>

  </div>
  );
};

export default ViewInfo;