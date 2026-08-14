import { XCircle } from "lucide-react";

interface ErrorProps{
    text?: string
    onClick?: ()=> void 
}

const Error = ({text="Algo salio mal, intente de nuevo", onClick}:ErrorProps) => {
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-500 text-white p-6">

        <XCircle size={80} />

        <h1 className="text-3xl font-bold mt-4">
        Ocurrió un error
        </h1>

        <p className="mt-2 text-center">
        {text}
        </p>

        <button onClick={onClick} className="mt-6 bg-white text-red-500 px-4 py-2 rounded-lg font-semibold">
        Reintentar
        </button>

    </div>
    );
};

export default Error;