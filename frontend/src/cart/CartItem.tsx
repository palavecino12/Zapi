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
    <div className="w-screen px-2">

      <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 w-full">

        {/* Parte superior */}
        <div className="bg-slate-800 p-2 flex items-center justify-between">

          <h2 className="text-orange-500 text-2xl font-semibold ml-4">
            {nombre}
          </h2>

          {/* boton para eliminar producto */}
          <button className="h-10 w-10 mr-2 flex items-center justify-center bg-linear-to-r from-orange-500 to-orange-700 border 
                  border-black/10 rounded-lg shadow-xl active:scale-95 active:shadow-none">
            <Trash2 color="white" />
          </button>

        </div>

        {/* Parte inferior */}
        <div className="bg-slate-800 p-2 flex items-center justify-between">

          <p className="text-slate-200 text-xl font-bold ml-4">
            Precio: ${precio.toLocaleString()}
          </p>

          {/* Controles */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3 mr-2">
              <button
                onClick={disminuirCant}
                className="text-orange-500 h-10 w-10 flex items-center justify-center text-xl font-bold border 
                  border-orange-500 rounded-lg  shadow-lg active:scale-95 active:shadow-none">-
              </button>

              <p className="text-slate-200 text-lg">{contador}</p>

              <button
                onClick={aumentarCant}
                className="h-10 w-10 flex items-center justify-center text-xl font-bold bg-linear-to-r from-orange-400 to-orange-600 border 
                  text-white border-black/10 rounded-lg shadow-lg active:scale-95 active:shadow-none">+
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cartitem;

