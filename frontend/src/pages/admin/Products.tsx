
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

// Componentes
import Header from "../../components/Header";
import { ProductSearch } from "../../product/ProductSearch";
import { AdminProductItem } from "../../product/AdminProductItem";
import { ConfirmModal } from "../../components/feedback/ConfirmModal";
import { EditProductModal } from "../../product/EditProductModal";
import { Spinner } from "../../components/feedback/Spinner";
import { ErrorModal } from "../../components/feedback/ErrorModal";

// Hooks y tipos
import { useGetProducts } from "../../hooks/useGetProducts";
import type { Product } from "../../types/productType";

export function Products() {

    // Guarda el texto ingresado en el buscador.
    const [productSearch, setProductSearch] = useState("");

    // Obtiene los productos, el estado de carga y posibles errores.
    const { products, error, loading } = useGetProducts();

    // Controla la apertura del modal de edición.
    const [openModal, setOpenModal] = useState(false);

    // Guarda el ID del producto que se quiere eliminar.
    const [productToDelete, setProductToDelete] = useState<number | null>(null);

    // Permite navegar entre las diferentes pantallas.
    const navigate = useNavigate();

    // Busca el producto seleccionado para eliminar.
    const productPendingDelete = products.find(
        (p) => p.id === productToDelete
    );

    // Filtra los productos según el texto del buscador.
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(productSearch.toLowerCase())
    );

    // Se ejecuta cuando el usuario quiere editar un producto.
    const handleEdit = (product: Product) => {
        console.log("Editar producto:", product);
        setOpenModal(true);
    };

    // Guarda el ID del producto que el usuario quiere eliminar.
    const handleDelete = (id: number) => {
        setProductToDelete(id);
    };

    // Confirma la eliminación del producto seleccionado.
    const confirmDelete = () => {
        if (productToDelete !== null) {
            console.log("Eliminar producto con ID:", productToDelete);
        }

        setProductToDelete(null);
    };

    return (
        <div className="relative flex h-full min-h-0 flex-col overflow-hidden">

            {/* Encabezado */}
            <Header title="Mis Productos" />

            <main className="flex min-h-0 flex-1 flex-col">

                {/* Buscador de productos */}
                <div className="mx-auto w-full shrink-0 px-2">
                    <ProductSearch setProductSearch={setProductSearch} />
                </div>

                {/* Muestra el contenido según el estado de la petición */}
                {loading ? (

                    // Spinner mientras se cargan los productos.
                    <div className="flex min-h-0 flex-1 items-center justify-center">
                        <Spinner />
                    </div>

                ) : error ? (

                    // Mensaje de error si no se pudieron obtener los productos.
                    <div className="flex min-h-0 flex-1 items-center justify-center px-4">
                        <p className="text-center text-gray-500">
                            No se pudieron cargar los productos.
                        </p>
                    </div>

                ) : (

                    // Lista de productos cuando la carga finaliza correctamente.
                    <div className="min-h-0 flex-1 overflow-y-auto pb-35">

                        {filteredProducts.length > 0 ? (

                            // Recorre los productos filtrados y crea un componente por cada uno.
                            filteredProducts.map((product) => (
                                <AdminProductItem
                                    key={product.id}
                                    product={product}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))

                        ) : (

                            // Mensaje cuando la búsqueda no encuentra resultados.
                            <p className="py-8 text-center text-gray-500">
                                No se encontraron productos.
                            </p>
                        )}

                    </div>
                )}
            </main>

            {/* Botón para navegar a la pantalla de agregar productos */}
            <button
                className="fixed bottom-20 right-6 z-50 flex items-center justify-center rounded-full bg-violet-600 p-4 text-white shadow-lg transition-all hover:bg-violet-700 active:scale-95"
                onClick={() => navigate("/admin/add-product")}
                aria-label="Agregar producto"
            >
                <Plus className="h-6 w-6" />
            </button>

            {/* Modal en caso de que tengas problemas para cargar los productos */}
            <ErrorModal error="Lo sentimos, no pudimos cargar los productos." />

            {/* Modal para confirmar la eliminación de un producto */}
            <ConfirmModal
                open={productToDelete !== null}
                onCancel={() => setProductToDelete(null)}
                onConfirm={confirmDelete}
            >
                ¿Seguro que querés eliminar{" "}
                <strong>{productPendingDelete?.name}</strong>?
            </ConfirmModal>

            {/* Modal para editar un producto */}
            <EditProductModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onConfirm={() => {}}
            />

        </div>
    );
}
