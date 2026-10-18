import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
    <div className="fixed inset-0 z-50 flex h-dvh items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Contenedor del modal */}
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <h2 className="mb-6 text-center text-xl font-bold text-gray-800">
          Editor de producto
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              step="any"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Botones de acción */}
          <div className="mt-4 flex justify-center gap-4">
            <Button type="button" variant="secundario" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Editar
            </Button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot
  );
};