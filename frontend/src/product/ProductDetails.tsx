type ProductDetailsProps = {
  name: string;
  price: number;
};

const ProductDetails = ({ name, price }: ProductDetailsProps) => {
  return (
    <div className="p-4  rounded-2xl">
      <div className="border-2 border-dashed rounded-xl p-10 text-center shadow-xl">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-violet-600 font-semibold text-4xl">
          ${price.toLocaleString()}
        </p>
      </div>
    </div>

  );
};

export default ProductDetails;

