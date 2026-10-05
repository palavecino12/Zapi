import Header from "../../components/Header";
import { useGetProducts } from "../../hooks/useGetProducts";
import { Button } from "../../components/Button";

export function ReviewStock() {
  const { products } = useGetProducts();

  return (
    <div className="h-dvh flex flex-col items-center">
      <Header title="Control de stock" />

      <div className="w-full flex-1 overflow-y-auto px-5 pt-4">
        <div className="w-full rounded-md border border-dashed border-blue-400 p-2">
          <div className="flex flex-col gap-2">
            {products.map((product) => (
              <div key={product.id} className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-3 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {product.name}
                  </p>
                  <p className={`text-xs ${product.stock === 0 ? "text-red-500" : "text-gray-500"}`}>
                    Stock: {product.stock}
                  </p>
                </div>

                <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600">
                  Stock Actual
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button variant="primario">Aceptar</Button>
    </div>
  );
}