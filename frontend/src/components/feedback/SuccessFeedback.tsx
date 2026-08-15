import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SuccessProps {
  text?: string
}

export const SuccessFeedback = ({ text = "Todo salio correctamente" }: SuccessProps) => {

  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-green-500 text-white gap-10">

      <CheckCircle size={80} />

      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mt-4">
          ¡Operación exitosa!
        </h1>
        <p className="mt-2 text-center text-lg">
          {text}
        </p>
      </div>

      <button onClick={() => navigate("/cart")} className="h-11 w-40 mt-6 bg-white text-green-500 rounded-lg font-semibold">
        Inicio
      </button>

    </div>
  );
};
