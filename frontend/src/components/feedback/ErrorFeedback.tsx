import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ErrorProps {
    text?: string
}

export const ErrorFeedback = ({ text = "Lo sentimos, intente de nuevo mas tarde" }: ErrorProps) => {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center h-dvh bg-red-500 text-white gap-10">

            <XCircle size={80} />

            <div className="flex flex-col items-center mx-10">
                <h1 className="text-3xl font-bold mt-4">
                    Ocurrió un error
                </h1>
                <p className="mt-2 text-center text-lg">
                    {text}
                </p>
            </div>

            <button
                onClick={()=>navigate("/cart") }
                className="h-11 w-40 mt-6 bg-white text-red-500 rounded-lg font-semibold">
                Inicio
            </button>

        </div>
    );
};
