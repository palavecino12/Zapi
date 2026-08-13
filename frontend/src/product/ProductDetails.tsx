// Este componente se va a usar para mostrar la informacion 
// del producto cuando un usuario escanee uno. 
 
import { 
  CupSoda, 
  Cookie, 
  Candy, 
  Coffee 
} from "lucide-react"; 
 
type ProductDetailsProps = { 
  name: string; 
  price: number; 
  categoria: string; 
}; 
 
const ProductDetails = ({ 
  name, 
  price, 
  categoria 
}: ProductDetailsProps) => { 
 
  const categories = { 
    bebidas: { 
      nombre: "Bebidas", 
      icono: CupSoda 
    }, 
 
    snacks: { 
      nombre: "Snacks", 
      icono: Cookie 
    }, 
 
    golosinas: { 
      nombre: "Golosinas", 
      icono: Candy 
    }, 
 
    cafe: { 
      nombre: "Café", 
      icono: Coffee 
    } 
  }; 
 
  const categoriaSeleccionada = categories[categoria as keyof typeof categories]; 
 
  const Icon = categoriaSeleccionada.icono; 
 
  return ( 
    <div className="p-4"> 
      <div className="relative bg-white  shadow-md overflow-hidden"> 
 
        {/* Etiqueta de categoría */} 
        <div className="absolute top-0 left-0 w-16 h-24 bg-violet-600 flex justify-center pt-3"> 
          <Icon className="text-white mt-2" size={40}/> 
 
          {/* Punta de la etiqueta */} 
          <div className=" absolute bottom-0 left-0 w-0 h-0 border-l-[32px] border-r-[32px] border-b-[10px] border-l-transparent border-r-transparent border-b-white" /> 
        </div> 
 
        {/* Contenido */} 
        <div className="p-8 pt-10 text-center"> 
 
          <h2 className="text-xl font-semibold mb-4"> 
            {name} 
          </h2> 
 
          <div className="border-t border-gray-200 pt-4"> 
            <p className="text-violet-600 font-semibold text-4xl"> 
              ${price.toLocaleString()} 
            </p> 
          </div> 
 
        </div> 
 
      </div> 
    </div> 
  ); 
}; 
 
export default ProductDetails;