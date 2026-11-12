
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import Header from "../../components/Header";
import { Button } from "../../components/Button";
import { ProductSearch } from "../../product/ProductSearch";
import { StockItem } from "../../product/StockItem";
import { Spinner } from "../../components/feedback/Spinner";
import { ErrorModal } from "../../components/feedback/ErrorModal";

// Hooks
import { useGetProducts } from "../../hooks/useGetProducts";
import { getProducts } from "../../services/productServices";

export function Stock() {
    const [productSearch, setProductSearch] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [amount, setAmount] = useState("");

    const { products, error, loading } = useGetProducts(getProducts);
    const navigate = useNavigate();

    // Filtrar productos por nombre.
    const filtered = useMemo(
        () =>
            products.filter((p) =>
                p.name.toLowerCase().includes(productSearch.trim().toLowerCase())
            ),
        [products, productSearch]
    );

    // Iniciar edición de stock.
    const handleAdd = (id: number) => {
        setEditingId(id);
        setAmount("");
    };

    // Confirmar cantidad a agregar.
    const handleConfirmAdd = (id: number) => {
        const value = Number(amount);

        if (!value || value <= 0) return;

        console.log("Agregar stock a", id, value);

        setEditingId(null);
        setAmount("");
    };

    return (
        <>
            {/* Modal de error */}
            <ErrorModal error={error ? "Lo sentimos, no pudimos cargar los productos." : null} />

            <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white">

                {/* Encabezado */}
                <Header title="Stocks" />

                <main className="flex min-h-0 flex-1 flex-col">

                    {/* Buscador */}
                    <div className="mx-auto w-full shrink-0 px-2">
                        <ProductSearch setProductSearch={setProductSearch} />
                    </div>

                    {/* Contenido según el estado de la petición */}
                    {loading ? (

                        // Spinner de carga.
                        <div className="flex min-h-0 flex-1 items-center justify-center">
                            <Spinner />
                        </div>

                    ) : error ? (

                        // Mensaje de error.
                        <div className="flex min-h-0 flex-1 items-center justify-center px-4">
                            <p className="text-center text-gray-500">
                                No se pudieron cargar los productos.
                            </p>
                        </div>

                    ) : (

                        // Lista de productos.
                        <div className="min-h-0 flex-1 overflow-y-auto pb-35">
                            <ul className="mx-auto flex w-full max-w-md flex-col">

                                {filtered.map((prod) => (
                                    <StockItem
                                        key={prod.id}
                                        product={prod}
                                        isEditing={editingId === prod.id}
                                        amount={amount}
                                        onAmountChange={setAmount}
                                        onAdd={() => handleAdd(prod.id)}
                                        onConfirm={() => handleConfirmAdd(prod.id)}
                                    />
                                ))}

                                {/* Sin resultados */}
                                {filtered.length === 0 && (
                                    <li className="py-8 text-center text-sm text-gray-500">
                                        No se encontraron productos.
                                    </li>
                                )}

                            </ul>
                        </div>
                    )}
                </main>

                {/* Botón Revisar Stock */}
                {!loading && !error && (
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
