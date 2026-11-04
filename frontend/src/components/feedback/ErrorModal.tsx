
import { useState } from "react";
import { InfoModal } from "./InfoModal";

type Props = {
    error: string | null;
};

export const ErrorModal = ({ error }: Props) => {

    // Controla si el modal está abierto.
    const [open, setOpen] = useState(false);

    // Guarda el último error recibido.
    const [prevError, setPrevError] = useState(error);

    // Detecta un error nuevo y abre el modal.
    if (error !== prevError) {
        setPrevError(error);

        if (error) {
            setOpen(true);
        }
    }

    return (
        <InfoModal
            open={open}
            onAccept={() => setOpen(false)}
        >
            <div className="flex flex-col items-center gap-3 px-2 py-2">

                {/* Título */}
                <h2 className="text-xl font-bold tracking-tight text-gray-800">
                    ¡Ups! Algo salió mal
                </h2>

                {/* Descripción del error */}
                <p className="text-center text-sm font-medium leading-relaxed text-gray-500">
                    {error}
                </p>

            </div>
        </InfoModal>
    );
};
