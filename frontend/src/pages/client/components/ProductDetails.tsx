type ProductDetailsProps = {
  nombre: string;
  precio: number;
};

const ProductDetails = ({ nombre, precio }: ProductDetailsProps) => {
  return (
    <div className="p-6 bg-orange-200 rounded-2xl">
      <div className="border-2 border-dashed border-orange-600 rounded-xl p-10 text-center shadow-xl">
        <h2 className="text-xl font-semibold mb-2">{nombre}</h2>
        <p className="text-orange-500 font-semibold text-4xl">
          ${precio.toLocaleString()}
        </p>
      </div>
    </div>

  );
};

export default ProductDetails;

