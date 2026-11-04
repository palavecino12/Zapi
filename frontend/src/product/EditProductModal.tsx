
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Pencil } from "lucide-react";
import { Button } from "../components/Button";

interface ProductToEdit {
  name: string;
  price: number | string;
}

interface EditProductModalProps {
  open: boolean;
  product?: ProductToEdit | null;
  onClose: () => void;
  onConfirm: (updatedData: { name: string; price: number }) => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  product,
  onClose,
  onConfirm,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string | number>("");

  useEffect(() => {
    if (product) {
      setName(product.name ?? "");
      setPrice(product.price ?? "");
    } else {
      setName("");
      setPrice("");
    }
  }, [product, open]);

  const modalRoot = document.getElementById("modal");

  if (!open || !modalRoot) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onConfirm({
      name: name.trim(),
      price: typeof price === "string" ? parseFloat(price) || 0 : Number(price),
    });

    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex h-dvh items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm animate-in fade-in zoom-in-95 rounded-xl border border-gray-200 bg-white p-5 shadow-2xl duration-200">

        {/* Encabezado */}
        <div className="mb-5 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
            <Pencil size={28} strokeWidth={1.8} />
          </div>

          <h2 className="text-xl font-bold tracking-tight text-gray-800">
            Editar producto
          </h2>

          <p className="text-center text-sm text-gray-500">
            Modificá los datos del producto seleccionado.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Nombre
            </label>

            <input
              type="text"
              placeholder="Nombre del producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white p-3 text-base text-gray-800 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Precio
            </label>

            <input
              type="number"
              step="any"
              min="0"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white p-3 text-base text-gray-800 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Acciones */}
          <div className="mt-2 flex gap-3">
            <Button
              type="button"
              variant="secundario"
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button type="submit">
              Guardar 
            </Button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot
  );
};
