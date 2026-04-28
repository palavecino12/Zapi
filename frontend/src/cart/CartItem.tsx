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

      <div className="rounded-2xl overflow-hidden shadow-2xl border border-black/20 w-full">

        {/* Parte superior */}
        <div className="bg-gray-100 p-4 flex items-center justify-between">

          <h2 className="text-orange-500 text-2xl font-semibold">
            {nombre}
          </h2>

          {/* boton para eliminar producto */}
          <button className="bg-linear-to-r from-orange-400 to-orange-600 p-2 border border-black/10 rounded-lg shadow-xl active:scale-95 active:shadow-none">
            <Trash2 color="white" />
          </button>

        </div>

        {/* Parte inferior */}
        <div className="bg-linear-to-r from-orange-400 to-orange-600 p-3 text-white flex items-center justify-between">

          <p className="text-xl font-bold mt-1">
            Precio: ${precio.toLocaleString()}
          </p>

          {/* Controles */}
          <div className="flex items-center justify-between mt-3">

            <div className="flex items-center gap-3">
              <button
                onClick={disminuirCant}
                className="px-4 py-1 text-xl font-bold border border-white rounded-lg  shadow-lg active:scale-95 active:shadow-none">-
              </button>

              <p className="text-lg">{contador}</p>

              <button
                onClick={aumentarCant}
                className="px-4 py-1 text-xl font-bold border border-white rounded-xl shadow-lg active:scale-95 active:shadow-none">+
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cartitem;

