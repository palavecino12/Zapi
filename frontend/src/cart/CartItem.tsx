import { useState } from "react";

type CartitemProps = {
    nombre: string;
    precio: number;
};  


const Cartitem = ({nombre, precio} : CartitemProps) => {

    const [contador, setContador] = useState(0);

    function aumentarCant(): void {
  setContador(prev => prev + 1);
    }

    function disminuirCant(): void {
        if (0 >= contador) {
            setContador(0);
            console.log("aca deberia negar y eliminar del carrito");
        }else{
            setContador(prev => prev - 1);
        }
    }

  return (
 <div className="w-screen px-2">

  <div className="rounded-2xl overflow-hidden shadow-lg w-full">

    {/* Parte superior */}
    <div className="bg-gray-100 p-5 flex items-center justify-between">

  <h2 className="text-orange-500 text-2xl font-semibold">
    {nombre}
  </h2>

  {/* Icono */}
  <svg
  onClick={disminuirCant}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className="w-8 h-8 cursor-pointer bg-orange-500 text-white rounded-lg p-1 shadow-md hover:shadow-lg transition"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79"
  />
</svg>

</div>

    {/* Línea */}
    <div className="h-1 bg-orange-500"></div>

    {/* Parte inferior */}
    <div className="bg-orange-500 p-3 text-white flex items-center justify-between">

      <p className="text-xl font-bold mt-1">
        Precio: ${precio.toLocaleString()}
      </p>

      {/* Controles */}
      <div className="flex items-center justify-between mt-4">

        <div className="flex items-center gap-3">
          <button
            onClick={disminuirCant}
            className="px-3 py-1 text-xl font-bold border border-white rounded-xl"
          >
            -
          </button>

          <p className="text-lg">{contador}</p>

          <button
            onClick={aumentarCant}
            className="px-3 py-1 text-xl font-bold border border-white rounded-xl"
          >
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

