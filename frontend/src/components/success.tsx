import { CheckCircle } from "lucide-react";

interface SuccessProps{
    text?: string
    onClick?: ()=> void 
}

const Success = ({text="Todo salio correctamente", onClick}:SuccessProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-500 text-white p-6">

      <CheckCircle size={80} />

      <h1 className="text-3xl font-bold mt-4">
        ¡Operación exitosa!
      </h1>

      <p className="mt-2 text-center">
        {text}
      </p>

      <button onClick={onClick} className="mt-6 bg-white text-green-500 px-4 py-2 rounded-lg font-semibold">
        Continuar
      </button>

    </div>
  );
};

export default Success;