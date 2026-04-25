import ProductDetails from "./components/ProductDetails";
import { Button } from "../../components/Button";

const ViewInfo = () => {
  return (
  <div className="flex flex-col items-center mt-20 gap-6">

    {/* Card */}
    <ProductDetails nombre="Oreo" precio={1000} />

    {/* Botones */}
    <div className="flex gap-1 mt-50">

        <Button variant="secundario">Cancelar</Button>

        <Button variant="primario">Añadir</Button>

    </div>

  </div>
);
};

export default ViewInfo;