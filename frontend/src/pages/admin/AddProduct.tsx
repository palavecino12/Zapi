import { useState } from 'react';
import Header from '../../components/Header';
import { CameraView } from '../../scanner/CameraView';
import { Button } from '../../components/Button';

export function AddProduct() {
  const [code, setCode] = useState("")

  return (

    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <Header title='Carga de producto' />

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* Cámara / captura de imagen del producto */}
        <div className="w-full h-40 rounded-xl border border-dashed border-purple-200 bg-purple-50 flex items-center justify-center mb-4 overflow-hidden">
          <CameraView mode='admin' onScanCode={setCode} />
        </div>

        {/* Código de barra escaneado */}
        <button className="w-full border border-purple-200 rounded-lg py-3 text-purple-600 font-medium mb-5">
          {code}
        </button>

        {/* Nombre */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </label>
        <input
          type="text"
          placeholder="Nombre del producto"
          className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 mb-4 text-sm text-gray-900 placeholder-gray-400"
        />

        {/* Precio */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Precio
        </label>
        <input
          type="number"
          placeholder="Precio ($)"
          className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 mb-4 text-sm text-gray-900 placeholder-gray-400"
        />

        {/* Stock */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stock
        </label>
        <input
          type="number"
          placeholder="Cantidad inicial"
          className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 mb-6 text-sm text-gray-900 placeholder-gray-400"
        />

        {/* Subir */}
        <Button>
          Subir
        </Button>
      </div>

    </div>
  );
}