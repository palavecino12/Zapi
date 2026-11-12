import React from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";

import { Button } from "../../../components/Button";
import { Imput } from "../../../components/Imput";
import { updateProductSchema } from "../schemas/product.schema";
import type { updateProductDTO } from "../types/productType";

// Props que recibe el modal desde el componente padre.
interface EditProductModalProps {
    open: boolean;
    product: updateProductDTO;
    onClose: () => void;
    onConfirm: (data: updateProductDTO) => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({open,product,onClose,onConfirm}) => {

    // Configuramos React Hook Form y conectamos Zod.
    const {register,handleSubmit,formState: { errors }} = useForm<updateProductDTO>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name: product.name,
            price: Number(product.price),
        },
    });

    // Se ejecuta únicamente si todos los campos pasan la validación.
    const onSubmit = (data: updateProductDTO) => {
        onConfirm(data);
        onClose();
    };

    // Buscamos el contenedor donde se renderizará el modal.
    const modalRoot = document.getElementById("modal");

    // Si el modal está cerrado o no existe el contenedor, no lo mostramos.
    if (!open || !modalRoot) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex h-dvh items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

            <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-2xl">

                {/* Encabezado */}
                <div className="mb-5 flex flex-col items-center gap-3">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                        <Pencil size={28} />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                        Editar producto
                    </h2>

                    <p className="text-center text-sm text-gray-500">
                        Modificá los datos del producto seleccionado.
                    </p>

                </div>

                {/* Formulario */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col gap-4"
                >

                    {/* Nombre */}
                    <Imput
                        label="Nombre"
                        placeholder="Nombre del producto"
                        error={errors.name?.message}
                        {...register("name")}
                    />

                    {/* Precio */}
                    <Imput
                        label="Precio"
                        type="number"
                        step="any"
                        placeholder="0.00"
                        error={errors.price?.message}
                        {...register("price", { valueAsNumber: true })}
                    />

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
