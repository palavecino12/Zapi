import { XCircle } from "lucide-react";

const Error = () => {
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-500 text-white p-6">

        <XCircle size={80} />

        <h1 className="text-3xl font-bold mt-4">
        Ocurrió un error
        </h1>

        <p className="mt-2 text-center">
        Algo salió mal. Intentá nuevamente.
        </p>

        <button className="mt-6 bg-white text-red-500 px-4 py-2 rounded-lg font-semibold">
        Reintentar
        </button>

    </div>
    );
};

export default Error;