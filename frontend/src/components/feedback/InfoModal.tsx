//Por el momento este modal solo se reutiliza dentro de errorModal.
import React from 'react';
import { Button } from '../Button';
import { createPortal } from 'react-dom';
import { AlertCircle } from 'lucide-react';

interface ConfirmModalProps {
    open: boolean;
    children: React.ReactNode;
    onAccept: () => void;
}

export const InfoModal = ({ open, children, onAccept }: ConfirmModalProps) => {

    const modalRoot = document.getElementById("modal");

    if (!open || !modalRoot) return null;

    return createPortal(
        <div className="h-dvh fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Contenedor del modal */}
            <div className="rounded-lg bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 
            flex flex-col justify-center items-center">

                 {/* Icono de error */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <AlertCircle size={30} strokeWidth={1.8} />
                </div>

                {/* Contenido dinámico (children) */}
                <div className="mb-10 mt-5 text-center text-lg">
                    {children}
                </div>

                <Button className="flex justify-center items-center gap-7" onClick={onAccept}>
                    Aceptar
                </Button>

            </div>
        </div>
        , modalRoot);
};