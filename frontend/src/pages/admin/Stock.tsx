import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import Header from "../../components/Header";
import { Button } from "../../components/Button";
import { ProductSearch } from "../../features/products/components/ProductSearch";
import { StockItem } from "../../features/stock/components/StockItem";
import { ProductList } from "../../features/products/components/ProductList";
import { Spinner } from "../../components/feedback/Spinner";
import { ErrorModal } from "../../components/feedback/ErrorModal";
import { Loading } from "../../components/feedback/Loading";

// Hooks
import { useGetProducts } from "../../features/products/hooks/useGetProducts";
import { getProducts } from "../../features/products/services/productServices";
import { useAddStock } from "../../features/stock/hooks/useAddStock";

export function Stock() {

    const navigate = useNavigate();

    // Custom hooks
    const { products, error: productsError, loading: productsLoading, refreshProducts } = useGetProducts(getProducts);
    const {addProductStock,error: addStockError,loading: addStockLoading} = useAddStock();

    // LISTA DE PRODUCTOS

    // Guarda el texto ingresado en el buscador.
    const [productSearch, setProductSearch] = useState("");

    // Filtra los productos por nombre.
    const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(productSearch.trim().toLowerCase())
    );

    // SUMA DE STOCK

    // Guarda el código del producto al que queremos sumar stock.
    const [editingCode, setEditingCode] = useState<string | null>(null);

    // Guarda la cantidad que queremos agregar.
    const [amount, setAmount] = useState("");

    // Iniciar edición de stock.
    const handleAdd = (code: string) => {
        setEditingCode(code);
        setAmount("");
    };

    // Confirmar cantidad a agregar.
    const handleConfirmAdd = async (code: string) => {
        const quantity = Number(amount);

        if (!Number.isInteger(quantity) || quantity <= 0) return;

        try {
            const response = await addProductStock(code, quantity);

            if (response) {
                setEditingCode(null);
                setAmount("");
                refreshProducts();
            }

        } catch (error) {
            // Solo mostramos el error real por consola
            // ya que le estamos notificando al usuario por un modal.
            console.error("Error al agregar stock:", error);
        }
    };

    return (
        <>
            {/* Feedback de carga */}
            {addStockLoading && <Loading />}

            {/* Modales de error */}
            <ErrorModal error={productsError ? "Lo sentimos, no pudimos cargar los productos." : null} />
            <ErrorModal error={addStockError ? "Error al agregar stock al producto." : null} />

            <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white">

                {/* Encabezado */}
                <Header title="Stocks" />

                <main className="flex min-h-0 flex-1 flex-col">

                    {/* Buscador */}
                    <div className="mx-auto mb-2 w-full shrink-0 px-2">
                        <ProductSearch setProductSearch={setProductSearch} />
                    </div>

                    {/* Contenido según el estado de la petición */}
                    {productsLoading ? (

                        // Spinner de carga.
                        <div className="flex min-h-0 flex-1 items-center justify-center">
                            <Spinner />
                        </div>

                    ) : productsError ? (

                        // Mensaje de error.
                        <div className="flex min-h-0 flex-1 items-center justify-center px-4">
                            <p className="text-center text-gray-500">
                                No se pudieron cargar los productos.
                            </p>
                        </div>

                    ) : (

                        // Lista de productos.
                        <div className="min-h-0 flex-1 overflow-y-auto pb-35">
                            <div className="mx-auto w-full max-w-md">
                                <ProductList
                                    products={filtered}
                                    renderItem={(prod) => (
                                        <StockItem
                                            product={prod}
                                            isEditing={editingCode === prod.code}
                                            amount={amount}
                                            onAmountChange={setAmount}
                                            onAdd={() => handleAdd(prod.code)}
                                            onConfirm={() => handleConfirmAdd(prod.code)}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    )}
                </main>

                {/* Botón Revisar Stock */}
                {!productsLoading && !productsError && (
                    <div className="fixed bottom-20 left-0 z-40 w-full px-4">
                        <div className="mx-auto w-full max-w-md">
                            <Button
                                onClick={() => navigate("/admin/review-stock")}
                                className="w-full"
                            >
                                Revisar Stock
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
