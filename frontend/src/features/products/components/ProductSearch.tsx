import { Search } from "lucide-react";

interface props {
    setProductSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const ProductSearch = ({ setProductSearch }: props) => {
    return (
        <div className="relative w-full">

            {/* Input de búsqueda */}
            <input
                type="text"
                placeholder="Buscar producto..."
                className="h-11 peer w-full rounded-xl border border-gray-200 bg-white pl-11 text-base text-gray-800 shadow-md outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
                onChange={(e) => {
                    const value = e.target.value.trim();

                    if (value.length > 2) {
                        setProductSearch(value);
                    } else {
                        setProductSearch("");
                    }
                }}
            />

            {/* Icono del buscador */}
            <Search
                size={20}
                strokeWidth={1.8}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-violet-600"
            />

        </div>
    );
};
