export const ScanInstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-slate-900 rounded-2xl shadow-lg max-w-sm mx-auto border border-gray-200 dark:border-slate-800">
      
      {/* Cuadro del Scanner */}
      <div className="relative w-56 h-56 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-slate-600">
        
        {/* Simulación codigo de Barrras */}
        <svg 
          className="w-40 h-40 text-gray-800 dark:text-gray-200" 
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
        <div 
          className="absolute left-0 w-full h-1.5 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]"
          style={{ animation: 'scan 2.5s ease-in-out infinite' }}
        ></div>
        
        {/* Bordes del scanner en cada esquina*/}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-gray-400 dark:border-slate-500 rounded-tl-lg"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-gray-400 dark:border-slate-500 rounded-tr-lg"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-gray-400 dark:border-slate-500 rounded-bl-lg"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-gray-400 dark:border-slate-500 rounded-br-lg"></div>
      </div>

      {/* Estilos de animación embebidos para no tocar el tailwind.config */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 10%; opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { top: 90%; }
        }
      `}</style>


      <h3 className="mt-6 text-xl font-bold text-gray-800 dark:text-gray-100">
        Escaneá el producto
      </h3>
      <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
        Centrá el código de barras dentro del recuadro para leerlo correctamente.
      </p>
    </div>
  );
};