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
    <div className="border rounded-xl p-4 w-52 text-center shadow-md hover:shadow-lg transition">
  
  {/* Nombre */}
  <h2 className="text-lg font-semibold mb-2">{nombre}</h2>

  {/* Precio */}
  <p className="text-white font-bold text-xl bg-orange-500 mb-2">
    ${precio.toLocaleString()}
  </p>

  {/* Contador + botones */}
  <div className="flex items-center justify-center gap-3 mt-2">
    <button onClick={disminuirCant}>-</button>
    <p>{contador}</p>
    <button onClick={aumentarCant}>+</button>
  </div>
  <div className="flex justify-center mt-3">
    <svg
      onClick={disminuirCant}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  </div>

</div>
  );
};

export default Cartitem;
