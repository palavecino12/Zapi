//Aca voy a tener 3 botones para filtrar a los usuarios por: todos | locales | visitantes 
interface props {
    setSelected: React.Dispatch<React.SetStateAction<string>>
    selected: string
}

export const ProductFilterButtons = ({ setSelected, selected }: props) => {

    const filters = ["Todos", "Snacks", "Golosinas", "Bebidas", "Utiles"];

    return (
        <div className="flex">
            {filters.map((filter) => {
            
                return (
                    <button
                        key={filter}
                        onClick={() => setSelected(filter)}
                        className={`transition-all duration-200 w-29 h-11 
                            ${selected === filter
                                ? "bg-violet-600 text-white"
                                : "bg-white border border-black/20 text-black shadow-lg"
                            }
                        active:scale-95 active:shadow-inner`}>
                            {filter}
                    </button>
                );
            })}
        </div>
    );
};