
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

interface SpinnerProps {
    message?: string;
}

export const Spinner = ({
    message = "Cargando...",
}: SpinnerProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }}            >
                <Loader size={56} strokeWidth={2} />
            </motion.div>

            <p className="text-base font-semibold">
                {message}
            </p>
        </div>
    );
};
