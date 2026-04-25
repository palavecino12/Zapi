import {Button} from "../../components/Button";
import { useNavigate } from "react-router-dom";



const ViewHome = () => {
  const navigate=useNavigate()

  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={()=>navigate("/scan")}>
        Añadir producto
      </Button>
    </div>
  );
};

export default ViewHome;