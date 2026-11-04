
import React from "react";
import { createPortal } from "react-dom";
import { TriangleAlert } from "lucide-react";
import { Button } from "../Button";

interface ConfirmModalProps {
    open: boolean;
    children: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal = ({
    open,
    children,
    onConfirm,
    onCancel,
}: ConfirmModalProps) => {
    const modalRoot = document.getElementById("modal");

    if (!open || !modalRoot) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex h-dvh items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="flex w-full max-w-sm animate-in fade-in zoom-in-95 flex-col items-center rounded-xl border border-gray-200 bg-white p-5 shadow-2xl duration-200">

                {/* Encabezado */}
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                    <TriangleAlert size={30} strokeWidth={1.8} />
                </div>

                <h2 className="text-xl font-bold tracking-tight text-gray-800">
                    ¿Estás seguro?
                </h2>

                {/* Contenido dinámico */}
                <div className="mb-5 mt-3 text-center text-sm leading-relaxed text-gray-500">
                    {children}
                </div>

                {/* Acciones */}
                <div className="flex w-full gap-3">
                    <Button
                        type="button"
                        variant="secundario"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="button"
                        onClick={onConfirm}
                    >
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>,
        modalRoot
    );
};
