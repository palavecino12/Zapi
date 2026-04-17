type ProductDetailsProps = {
  nombre: string;
  precio: number;
};

const ProductDetails = ({ nombre, precio }: ProductDetailsProps) => {
  return (
    <div className="border rounded-xl p-4 w-52 text-center shadow-md">
      <h2 className="text-lg font-semibold mb-2">{nombre}</h2>
      <p className="text-white font-bold text-xl bg-orange-500">
        ${precio.toLocaleString()}
      </p>
    </div>
  );
};

export default ProductDetails;

