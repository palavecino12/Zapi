import { useNavigate } from "react-router-dom";
import  CartList  from "../../cart/CartList";
import { Button } from "../../components/Button";
import { Plus } from 'lucide-react';
import Header from "../../components/Header";

export const ViewCart = () => {
  const navigate=useNavigate()

  //Funcion para consumir el endpoint para pagar
  const pagar = async () => {
  const res = await fetch("http://localhost:3000/payment/create", {
    method: "POST",
  });

  const data = await res.json();

  window.location.href = data.url;
};

  return (
    <div className="flex flex-col items-center">

      <Header title="Mi Carrito"/>
      
      <CartList
        carrito={[
          {
            id: 1,
            nombre: "Coca Cola 500ml",
            precio: 1200,
          },
          {
            id: 2,
            nombre: "Galletas Oreo",
            precio: 950,
          },
          {
            id: 3,
            nombre: "Papas Lays",
            precio: 1100,
          },
          {
            id: 4,
            nombre: "Papas Lays",
            precio: 1100,
          },
          {
            id: 5,
            nombre: "Papas Lays",
            precio: 1100,
          },
          {
            id: 6,
            nombre: "Papas Lays",
            precio: 1100,
          },
          {
            id: 7,
            nombre: "Papas Lays",
            precio: 1100,
          },
          
        ]}/>

      <div className="flex flex-col gap-3 mt-5">
        <Button variant="secundario" onClick={()=>{navigate("/scan")}}><div className="flex justify-center gap-2"><Plus />Añadir Producto</div></Button>
        <Button onClick={pagar}>Pagar</Button>
      </div>
    </div>
  );
};