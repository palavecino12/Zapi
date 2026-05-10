import { useState } from "react";
import { Trash2 } from 'lucide-react';


type CartItemProps = {
  nombre: string;
  precio: number;
};

const Cartitem = ({ nombre, precio }: CartItemProps) => {

  const [contador, setContador] = useState(1);

  function aumentarCant(): void {
    setContador(prev => prev + 1);
  }

  function disminuirCant(): void {
    if (1 >= contador) {
      setContador(1);
    } else {
      setContador(prev => prev - 1);
    }
  }

  return (
    <div className="w-screen px-2" data-aos="zoom-in" >

      <div className="rounded-2xl overflow-hidden shadow-2xl border border-black/20 w-full">

        {/* Parte superior */}
        <div className="bg-gray-100 p-2 flex items-center justify-between">

          <h2 className="text-black/90 text-2xl font-semibold ml-4">
            {nombre}
          </h2>

          {/* boton para eliminar producto */}
          <button className="h-10 w-10 mr-2 flex items-center justify-center bg-gray-100  
                   rounded-lg shadow-xl active:bg-gray-400 active:scale-95 active:shadow-none active:text-white">
            <Trash2 color="black" />
          </button>

        </div>

        {/* Parte inferior */}
        <div className="bg-gray-100 p-2 flex items-center justify-between">

          <p className="text-black/60 text-xl font-bold ml-4">
            Precio: <span className="text-violet-600">${precio.toLocaleString()}</span>
          </p>

          {/* Controles */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3 mr-2">
              <button
                onClick={disminuirCant}
                className=" h-10 w-10 flex items-center justify-center text-xl font-bold border 
                  border-gray-400 rounded-lg  shadow-lg active:bg-gray-400 active:scale-95 active:shadow-none active:text-white">-
              </button>

              <p className="text-black text-lg">{contador}</p>

              <button onClick={aumentarCant} className="text-white h-10 w-10 flex items-center justify-center text-xl font-bold bg-violet-600 bordertext-white rounded-lg shadow-lg 
              transition-all duration-150 hover:bg-violet-700 active:bg-violet-800 active:scale-95 active:shadow-none">
                +
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cartitem;

