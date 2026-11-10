
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
import { Loading } from "../../components/feedback/Loading";

// Hooks y tipos
import { useGetProducts } from "../../hooks/useGetProducts";
import type { updateProductDTO } from "../../types/productType";
import { deleteProductByCode } from "../../services/productServices";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";

export function Products() {

    const navigate = useNavigate();

    // Custom hooks
    const {
        products,
        error: productsError,
        loading: productsLoading,
        refreshProducts
    } = useGetProducts();

    const {
        editProduct,
        error: updateError,
        loading: updateLoading
    } = useUpdateProduct();

    // Guarda el texto ingresado en el buscador.
    const [productSearch, setProductSearch] = useState("");

    // Filtra los productos según el texto del buscador.
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(productSearch.toLowerCase())
    );

    // ELIMINAR UN PRODUCTO

    // Guarda el código del producto que se quiere eliminar.
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    // Busca el producto seleccionado para mostrar su nombre.
    const productPendingDelete = products.find(
        (p) => p.code === productToDelete
    );

    // Selecciona el producto que se quiere eliminar.
    const handleDelete = (code: string) => {
        setProductToDelete(code);
    };

    // Confirma la eliminación del producto seleccionado.
    // Todavía no funciona porque hay que cambiar el back
    // para que solo edite un atributo del producto y no aparezca más.
    // También tengo que crear el hook y llamarlo acá.
    const confirmDelete = async () => {
        if (productToDelete !== null) {
            try {
                await deleteProductByCode(productToDelete);
                refreshProducts();

            } catch (error) {
                // En este caso de error mostrar un modal.
                console.log(error);
            }
        }

        setProductToDelete(null);
    };

    // EDITAR UN PRODUCTO

    // Guarda los datos del producto que se quiere editar (esto es para mostrarlos en el modal).
    const [productToEdit, setProductToEdit] = useState<updateProductDTO | null>(null);
    const [codeToEdit, setCodeToEdit] = useState<string | null>(null);

    // Selecciona el producto que se quiere editar.
    const handleEdit = (code: string, product: updateProductDTO) => {
        setProductToEdit(product);
        setCodeToEdit(code);
    };

    // Al confirmar la edición de un producto:
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

    // Cierra el modal y limpia el producto seleccionado.
    const handleCloseEdit = () => {
        setProductToEdit(null);
        setCodeToEdit(null);
    };

    return (
        <>
            {/* Feedback de carga y errores */}
            {updateLoading && <Loading />}

            {/* Modales de error */}
            <ErrorModal error={productsError ? "Lo sentimos, no pudimos cargar los productos." : null} />
            <ErrorModal error={updateError ? "Error al actualizar el producto." : null} />

            <div className="relative flex h-full min-h-0 flex-col overflow-hidden">

                {/* Encabezado */}
                <Header title="Mis Productos" />

                <main className="flex min-h-0 flex-1 flex-col">

                    {/* Buscador de productos */}
                    <div className="mx-auto w-full shrink-0 px-2">
                        <ProductSearch setProductSearch={setProductSearch} />
                    </div>

                    {/* Muestra el contenido según el estado de la petición */}
                    {productsLoading ? (

                        <div className="flex min-h-0 flex-1 items-center justify-center">
                            <Spinner />
                        </div>

                    ) : (

                        <div className="min-h-0 flex-1 overflow-y-auto pb-35">

                            {filteredProducts.length > 0 ? (

                                filteredProducts.map((product) => (
                                    <AdminProductItem
                                        key={product.id}
                                        product={product}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))

                            ) : (

                                <p className="py-8 text-center text-gray-500">
                                    No se encontraron productos.
                                </p>
                            )}

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

                {/* Modal para confirmar la eliminación */}
                <ConfirmModal
                    open={productToDelete !== null}
                    onCancel={() => setProductToDelete(null)}
                    onConfirm={confirmDelete}
                >
                    ¿Seguro que querés eliminar{" "}
                    <strong>{productPendingDelete?.name}</strong>?
                </ConfirmModal>

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
