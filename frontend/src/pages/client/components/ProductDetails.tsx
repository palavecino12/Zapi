type ProductDetailsProps = {
  nombre: string;
  precio: number;
};

const ProductDetails = ({ nombre, precio }: ProductDetailsProps) => {
  return (
    <div className="p-4  rounded-2xl">
      <div className="border-2 border-dashed rounded-xl p-10 text-center shadow-xl">
        <h2 className="text-xl font-semibold mb-2">{nombre}</h2>
        <p className="text-violet-600 font-semibold text-4xl">
          ${precio.toLocaleString()}
        </p>
      </div>
    </div>

  );
};

export default ProductDetails;

