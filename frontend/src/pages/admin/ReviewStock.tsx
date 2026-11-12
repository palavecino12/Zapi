
import { useState } from "react";

import Header from "../../components/Header";
import { Button } from "../../components/Button";
import { Spinner } from "../../components/feedback/Spinner";
import { ErrorModal } from "../../components/feedback/ErrorModal";

import { useGetProducts } from "../../features/products/hooks/useGetProducts";
import { ReviewStockItem } from "../../features/stock/components/ReviewStockItem";
import { ProductList } from "../../features/products/components/ProductList";
import { getProducts } from "../../features/products/services/productServices";

export function ReviewStock() {
  const { products, error, loading } = useGetProducts(getProducts);

  const [amounts, setAmounts] = useState<Record<number, string>>({});

  const handleAmountChange = (id: number, value: string) => {
    setAmounts((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAccept = () => {
    const reviewedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      stock:
        amounts[product.id] === undefined
          ? product.stock
          : Number(amounts[product.id]),
    }));

    console.log("Stock revisado:", reviewedProducts);
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <div className="shrink-0">
        <Header title="Control de stock" />
      </div>

      <main className="flex min-h-0 flex-1 flex-col">
        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="flex min-h-0 flex-1 items-center justify-center px-4">
            <p className="text-center text-gray-500">
              No se pudieron cargar los productos.
            </p>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-md">
              <ProductList
                products={products}
                emptyMessage="No hay productos para revisar."
                renderItem={(product) => (
                  <ReviewStockItem
                    product={product}
                    amount={amounts[product.id] ?? ""}
                    onAmountChange={(value) =>
                      handleAmountChange(product.id, value)
                    }
                  />
                )}
              />

              {products.length > 0 && (
                <div className="px-2 pb-6 pt-5">
                  <Button variant="primario" onClick={handleAccept}>
                    Aceptar
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <ErrorModal
        error={
          error
            ? "Lo sentimos, no pudimos cargar los productos."
            : null
        }
      />
    </div>
  );
}
