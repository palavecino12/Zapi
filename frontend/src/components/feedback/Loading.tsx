
import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

interface LoadingProps {
    message?: string;
}

export const Loading = ({
    message = "Procesando...",
}: LoadingProps) => {
    const modalRoot = document.getElementById("modal");

    if (!modalRoot) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex h-dvh items-center justify-center bg-black/30 px-4 backdrop-blur-sm">

            {/* Contenedor */}
            <div className="flex w-full max-w-[260px] flex-col items-center gap-5 rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl">

                {/* Indicador de carga */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50">

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <LoaderCircle
                            size={38}
                            strokeWidth={2.5}
                            className="text-violet-600"
                        />
                    </motion.div>

                </div>

                {/* Mensaje */}
                <div className="flex flex-col items-center gap-1.5">
                    <p className="text-base font-semibold text-gray-800">
                        {message}
                    </p>

                    <p className="text-xs font-medium text-gray-400">
                        Esto puede tardar unos segundos
                    </p>
                </div>

                {/* Indicador inferior */}
                <div className="h-1 w-32 overflow-hidden rounded-full bg-violet-100">
                    <motion.div
                        className="h-full w-1/2 rounded-full bg-violet-600"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                            duration: 1.3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>

            </div>
        </div>,
        modalRoot
    );
};
