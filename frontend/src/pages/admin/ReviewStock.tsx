
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { Spinner } from "../../components/feedback/Spinner";
import { ErrorModal } from "../../components/feedback/ErrorModal";
import { Loading } from "../../components/feedback/Loading";

import { useGetProducts } from "../../features/products/hooks/useGetProducts";
import { ReviewStockItem } from "../../features/stock/components/ReviewStockItem";
import { ProductList } from "../../features/products/components/ProductList";
import { getProducts } from "../../features/products/services/productServices";
import { useReviewStock } from "../../features/stock/hooks/useReviewStock";
import AdminHeader from "../../components/AdminHeader";

export function ReviewStock() {

  const navigate = useNavigate();

  // Custom hooks
  const { products, error: productsError, loading: productsLoading } = useGetProducts(getProducts);
  const { reviewProducts, error: reviewError, loading: reviewLoading } = useReviewStock();

  // Guarda las cantidades físicas ingresadas para cada producto.
  const [amounts, setAmounts] = useState<Record<number, string>>({});

  // Guarda los errores de validación antes de enviar la revisión.
  const [validationError, setValidationError] = useState<string | null>(null);

  // Actualiza la cantidad física ingresada para un producto.
  const handleAmountChange = (id: number, value: string) => {
    setAmounts((prev) => ({
      ...prev,
      [id]: value,
    }));

    setValidationError(null);
  };

  // Envía los productos revisados al backend.
  const handleAccept = async () => {

    // Seleccionamos únicamente los productos que tienen una cantidad ingresada.
    const reviewedProducts = products.filter((product) =>
        amounts[product.id] !== undefined &&
        amounts[product.id].trim() !== ""
      ).map((product) => ({
        code: product.code,
        physicalStock: Number(amounts[product.id]),
      }));

    // Evitamos enviar una revisión sin productos.
    if (reviewedProducts.length === 0) {
      setValidationError("Debes ingresar el stock físico de al menos un producto.");
      return;
    }

    // Verificamos que las cantidades sean enteros positivos o cero.
    const hasInvalidStock = reviewedProducts.some(
      (product) =>
        !Number.isInteger(product.physicalStock) ||
        product.physicalStock < 0
    );

    if (hasInvalidStock) {
      setValidationError("El stock debe ser un número entero igual o mayor a cero.");
      return;
    }

    // Consumimos el hook que realiza la petición al backend.
    const result = await reviewProducts({
      products: reviewedProducts,
    });

    // Si la petición fue exitosa, navegamos a la pantalla de resultados.
    if (result) {
      navigate("/admin/review-stock-result", {
        state: {
          reviewStock: result,
        },
      });
    }
  };

  return (
    <>
      {/* Indicador de carga mientras se envía la revisión. */}
      {reviewLoading && <Loading />}

      {/* Modal para mostrar errores de carga, validación o revisión. */}
      <ErrorModal
        error={
          productsError
            ? "Lo sentimos, no pudimos cargar los productos."
            : reviewError
              ? "Lo sentimos, no pudimos completar la revisión de stock."
              : validationError
        }
      />

      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">

        {/* Encabezado */}
        <div className="shrink-0">
          <AdminHeader title="Control de stock" />
        </div>

        <main className="flex min-h-0 flex-1 flex-col">

          {/* Muestra el contenido según el estado de la petición. */}
          {productsLoading ? (

            <div className="flex flex-1 items-center justify-center">
              <Spinner />
            </div>

          ) : productsError ? (

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

                {/* Botón para enviar los productos revisados. */}
                {products.length > 0 && (
                  <div className="px-2 py-5 w-full flex justify-center">
                    <Button
                      variant="primario"
                      onClick={handleAccept}
                    >
                      Aceptar
                    </Button>
                  </div>
                )}

              </div>
            </div>

          )}

        </main>
      </div>
    </>
  );
}
