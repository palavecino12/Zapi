
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOff, Plus } from "lucide-react";

// Componentes
import Header from "../../components/Header";
import { ProductSearch } from "../../product/ProductSearch";
import { AdminProductItem } from "../../product/AdminProductItem";
import { ConfirmModal } from "../../components/feedback/ConfirmModal";
import { EditProductModal } from "../../product/EditProductModal";
import { Spinner } from "../../components/feedback/Spinner";
import { ErrorModal } from "../../components/feedback/ErrorModal";
import { Loading } from "../../components/feedback/Loading";

// Hooks y tipos
import { useGetProducts } from "../../hooks/useGetProducts";
import type { updateProductDTO } from "../../types/productType";
import { getAllProducts } from "../../services/productServices";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { ProductList } from "../../product/ProductList";
import { InactiveProductItem } from "../../product/InactiveProductItem";
import { useRestoreProduct } from "../../hooks/useRestoreProduct";

export function Products() {

    const navigate = useNavigate();

    // Custom hooks
    const { products, error: productsError, loading: productsLoading, refreshProducts } = useGetProducts(getAllProducts);
    const { deleteProduct, error: deleteError, loading: deleteLoading } = useDeleteProduct()
    const { editProduct, error: updateError, loading: updateLoading } = useUpdateProduct();
    const { restoreProduct, error: restoreError, loading: restoreLoading } = useRestoreProduct();

    //LISTA DE PRODUCTOS

    const [showInactive, setShowInactive] = useState(false);

    // Guarda el texto ingresado en el buscador.
    const [productSearch, setProductSearch] = useState("");

    // Filtra los productos según el texto del buscador.
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(productSearch.toLowerCase()) &&
        (showInactive ? !product.isActive : product.isActive)
    );

    //ELIMINAR UN PRODUCTO

    //Guarda el código del producto que se quiere eliminar.
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    //Busca el producto seleccionado para mostrar su nombre.
    const productPendingDelete = products.find(
        (p) => p.code === productToDelete
    );

    //Selecciona el producto que se quiere eliminar.
    const handleDelete = (code: string) => {
        setProductToDelete(code);
    };

    //Confirma la eliminación del producto seleccionado.
    //También tengo que crear el hook y llamarlo acá.
    const confirmDelete = async () => {
        if (productToDelete !== null) {
            try {
                await deleteProduct(productToDelete);
                refreshProducts();

            } catch (error) {
                // En este caso de error mostrar un modal.
                console.log(error);
            }
        }

        setProductToDelete(null);
    };

    //REACTIVAR UN PRODUCTO

    //Selecciona y reactiva un producto previamente desactivado.
    const handleActivate = async (code: string) => {
        try {
            await restoreProduct(code);
            refreshProducts();

        } catch (error) {
            console.error("Error al reactivar el producto:", error);
        }
    };

    //EDITAR UN PRODUCTO

    //Guarda los datos del producto que se quiere editar (esto es para mostrarlos en el modal).
    const [productToEdit, setProductToEdit] = useState<updateProductDTO | null>(null);
    const [codeToEdit, setCodeToEdit] = useState<string | null>(null);

    //Selecciona el producto que se quiere editar.
    const handleEdit = (code: string, product: updateProductDTO) => {
        setProductToEdit(product);
        setCodeToEdit(code);
    };

    //Al confirmar la edición de un producto:
    const confirmEdit = async (data: updateProductDTO) => {
        if (!codeToEdit) return;

        try {
            await editProduct(codeToEdit, data);

            setProductToEdit(null);
            setCodeToEdit(null);

            refreshProducts();

        } catch (error) {
            // Solo mostramos el error real por consola
            // ya que le estamos notificando al usuario por un modal.
            console.error("Error al editar el producto:", error);
        }
    };

    //Cierra el modal y limpia el producto seleccionado.
    const handleCloseEdit = () => {
        setProductToEdit(null);
        setCodeToEdit(null);
    };

    return (
        <>
            {/* Feedback de carga y errores */}
            {updateLoading && <Loading />}
            {deleteLoading && <Loading />}
            {restoreLoading && <Loading />}

            {/* Modales de error */}
            <ErrorModal error={productsError ? "Lo sentimos, no pudimos cargar los productos." : null} />
            <ErrorModal error={updateError ? "Error al actualizar el producto." : null} />
            <ErrorModal error={deleteError ? "Error al actualizar el producto." : null} />
            <ErrorModal error={restoreError ? "Error al reactivar el producto." : null} />

            <div className="relative flex h-full min-h-0 flex-col overflow-hidden">

                {/* Encabezado */}
                <Header title="Mis Productos" />

                <main className="flex min-h-0 flex-1 flex-col">

                    {/* Buscador y filtro de productos inactivos */}
                    <div className="flex w-full shrink-0 items-center gap-2 px-2 mb-2">

                        <div className="min-w-0 flex-1">
                            <ProductSearch setProductSearch={setProductSearch} />
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowInactive(prev => !prev)}
                            title={showInactive ? "Ocultar productos inactivos" : "Mostrar productos inactivos"}
                            aria-label={showInactive ? "Ocultar productos inactivos" : "Mostrar productos inactivos"}
                            aria-pressed={showInactive}
                            className={`flex h-12 w-12 shrink-0 self-center items-center justify-center rounded-xl shadow-sm transition-colors ${showInactive
                                ? "bg-violet-600 text-white"
                                : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                                }`}
                        >
                            <EyeOff size={21} />
                        </button>
                    </div>

                    {/* Muestra el contenido según el estado de la petición */}
                    {productsLoading ? (

                        <div className="flex min-h-0 flex-1 items-center justify-center">
                            <Spinner />
                        </div>

                    ) : (

                        <div className="min-h-0 flex-1 overflow-y-auto pb-35">

                            <ProductList
                                products={filteredProducts}
                                renderItem={(product) => (
                                    showInactive ? (
                                        <InactiveProductItem
                                            product={product}
                                            onActivate={handleActivate}
                                        />
                                    ) : (
                                        <AdminProductItem
                                            product={product}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    )
                                )}
                            />

                        </div>
                    )}
                </main>

                {/* Botón para agregar productos */}
                <button
                    className="fixed bottom-20 right-6 z-50 flex items-center justify-center rounded-full bg-violet-600 p-4 text-white shadow-lg transition-all hover:bg-violet-700 active:scale-95"
                    onClick={() => navigate("/admin/add-product")}
                    aria-label="Agregar producto"
                >
                    <Plus className="h-6 w-6" />
                </button>

                <ConfirmModal
                    open={!!productPendingDelete}
                    productName={productPendingDelete?.name ?? ""}
                    action="hide"
                    onConfirm={confirmDelete}
                    onCancel={() => setProductToDelete(null)}
                />

                {/* Modal de edición: solamente existe si hay un producto seleccionado */}
                {productToEdit && (
                    <EditProductModal
                        product={productToEdit}
                        open={true}
                        onClose={handleCloseEdit}
                        onConfirm={confirmEdit}
                    />
                )}

            </div>
        </>
    );
}
