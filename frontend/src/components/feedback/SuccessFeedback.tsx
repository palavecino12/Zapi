import { CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface SuccessProps {
  text?: string
  redirectTo?: string
}

interface SuccessState {
  text?: string
  redirectTo?: string
}

export const SuccessFeedback = ({ text = "Todo salió correctamente", redirectTo = "/cart" }: SuccessProps) => {

  const navigate = useNavigate()
  const state = (useLocation().state ?? {}) as SuccessState

  // El state de la navegación tiene prioridad; las props quedan como respaldo
  const finalText = state.text ?? text
  const finalRedirect = state.redirectTo ?? redirectTo

  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-green-600 text-white gap-10">

      <CheckCircle size={80} />

      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mt-4">
          ¡Operación exitosa!
        </h1>
        <p className="mt-2 text-center text-lg">
          {finalText}
        </p>
      </div>

      <button
        onClick={() => navigate(finalRedirect, { replace: true })}
        className="h-11 w-40 mt-6 bg-white text-green-500 rounded-lg font-semibold"
      >
        Inicio
      </button>

    </div>
  );
};