import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";



const ViewHome = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center h-screen">
      <Header />
      <div className="m-auto">
        <Button onClick={() => navigate("/scan")}>
          Añadir producto
        </Button>
      </div>
    </div>
  );
};

export default ViewHome;