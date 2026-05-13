
export const ScanInstruction = () => {

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl max-w-sm mx-auto border border-gray-200 bg-white">
      
      {/* Cuadro del Scanner */}
      <div className="relative w-56 h-56 bg-white rounded-xl flex items-center justify-center overflow-hidden border-2 border-dashed border-black/20 ">
        
        {/* Simulación codigo de Barrras */}
        <svg 
          className="w-40 h-40 text-black" 
          fill="currentColor" 
          viewBox="0 0 100 50"
        >
          <rect x="10" y="5" width="4" height="40" rx="1" />
          <rect x="18" y="5" width="2" height="40" rx="1" />
          <rect x="24" y="5" width="6" height="40" rx="1" />
          <rect x="34" y="5" width="2" height="40" rx="1" />
          <rect x="40" y="5" width="8" height="40" rx="1" />
          <rect x="52" y="5" width="4" height="40" rx="1" />
          <rect x="60" y="5" width="2" height="40" rx="1" />
          <rect x="66" y="5" width="6" height="40" rx="1" />
          <rect x="76" y="5" width="4" height="40" rx="1" />
          <rect x="84" y="5" width="2" height="40" rx="1" />
          <rect x="90" y="5" width="4" height="40" rx="1" />
        </svg>

        {/* Laser con animación */}
        <div className="absolute left-0 w-full h-1.5 bg-violet-600 shadow-[0_0_12px_rgba(239,68,68,0.9)]"></div>
        
        {/* Bordes del scanner en cada esquina*/}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-black/50 rounded-tl-lg"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-black/50 rounded-tr-lg"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-black/50 rounded-bl-lg"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-black/50 rounded-br-lg"></div>
      </div>

      <h3 className="mt-6 text-xl font-bold text-black">
        Escaneá el producto
      </h3>
      <p className="mt-2 text-sm text-center text-black">
        Centrá el código de barra del prudcto con la linea roja.
      </p>
    </div>
  );
};