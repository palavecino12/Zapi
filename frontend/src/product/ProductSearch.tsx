import { Search } from "lucide-react";

interface props{
    setProductSearch:React.Dispatch<React.SetStateAction<string>>
}

export const ProductSearch = ({setProductSearch}:props) =>{
    return(
        <div className="relative w-full mb-2">

            {/* La razon por la que esta primero el input es para poder usar peer para cuando se hace foco en el input */}
            <input
                type="text"
                placeholder="Buscar producto..."
                className="peer w-full pl-10 p-3 border border-gray-400 rounded-xl shadow-lg
                    focus:ring-2 focus:border-transparent focus:outline-none focus:shadow-inner
                    transition-all duration-200 bg-white active:scale-95"
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 
                peer-focus:text-black peer-active:translate-x-2 transition-all duration-200" />

        </div>
    )
}
