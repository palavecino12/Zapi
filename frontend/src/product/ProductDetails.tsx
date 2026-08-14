// Este componente se va a usar para mostrar la información
// del producto cuando un usuario escanee uno.

type ProductDetailsProps = {
  name: string;
  price: number;
};

const ProductDetails = ({ name, price }: ProductDetailsProps) => {
  return (
    <div className="p-4">
      <div className="relative bg-white shadow-md overflow-hidden">
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