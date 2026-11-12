//Este es un modal que se usa para confirmar: ocular un producto, eliminarlo y recuperarlo
import { createPortal } from "react-dom";
import { TriangleAlert, EyeOff, RotateCcw } from "lucide-react";
import { Button } from "../Button";

interface ConfirmModalProps {
    open: boolean;
    productName: string;
    action: "hide" | "delete" | "restore";
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal = ({ open, productName, action, onConfirm, onCancel }: ConfirmModalProps) => {

    const modalRoot = document.getElementById("modal");

    if (!open || !modalRoot) return null;

    const isDelete = action === "delete";
    const isRestore = action === "restore";

    return createPortal(
        <div className="fixed inset-0 z-50 flex h-dvh items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="flex w-full max-w-sm animate-in fade-in zoom-in-95 flex-col items-center rounded-xl border border-gray-200 bg-white p-5 shadow-2xl duration-200">

                {/* Encabezado */}
                <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${isDelete
                    ? "bg-amber-100 text-amber-600"
                    : "bg-violet-100 text-violet-600"
                    }`}>
                    {isDelete ? (
                        <TriangleAlert size={30} strokeWidth={1.8} />
                    ) : isRestore ? (
                        <RotateCcw size={30} strokeWidth={1.8} />
                    ) : (
                        <EyeOff size={30} strokeWidth={1.8} />
                    )}
                </div>

                <h2 className="text-xl font-bold tracking-tight text-gray-800">
                    {isDelete
                        ? "¿Eliminar producto?"
                        : isRestore
                            ? "¿Restaurar producto?"
                            : "¿Ocultar producto?"}
                </h2>

                {/* Mensaje dinámico */}
                <div className="mb-5 mt-3 text-center text-sm leading-relaxed text-gray-500">
                    {isDelete ? (
                        <>
                            ¿Estás seguro de que querés eliminar definitivamente
                            el producto <strong className="font-semibold text-gray-700">{productName}</strong>?
                            Esta acción no se puede deshacer.
                        </>
                    ) : isRestore ? (
                        <>
                            El producto <strong className="font-semibold text-gray-700">{productName}</strong> volverá
                            a estar activo y visible para los clientes.
                        </>
                    ) : (
                        <>
                            El producto <strong className="font-semibold text-gray-700">{productName}</strong> dejará
                            de estar visible para los clientes. Podrás recuperarlo
                            cuando quieras desde la sección de productos ocultos.
                        </>
                    )}
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
                        {isDelete ? "Eliminar" : isRestore ? "Restaurar" : "Ocultar"}
                    </Button>
                </div>
            </div>
        </div>,
        modalRoot
    );
};
