import { useState } from "react";
import Header from "../../components/Header";
import { ProductSearch } from "../../product/ProductSearch";
import { useGetProducts } from "../../hooks/useGetProducts";
import { AdminProductItem } from "../../product/AdminProductItem";
import type { Product } from "../../types/productType";
import { Plus } from "lucide-react";
import { ConfirmModal } from "../../components/feedback/ConfirmModal";
import { EditProductModal } from "../../product/EditProductModal";


export function Products() {
  const [productSearch, setProductSearch] = useState("");
  const { products } = useGetProducts();
  const [openModal, setOpenModal] = useState(false);

  // ID del producto que se está por eliminar (null = ningún modal abierto)
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  // Producto completo correspondiente a ese ID, para mostrar su nombre en el modal
  const productPendingDelete = products.find((p) => p.id === productToDelete);

  // Productos filtrados por el buscador.
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Funciones handler para las acciones del Admin
  const handleEdit = (product: Product) => {
    console.log("Editar producto:", product);
    setOpenModal(true);
  };


  // Al tocar el ícono de eliminar, solo abrimos el modal de confirmación

  const handleDelete = (id: number) => {
    setProductToDelete(id);
  };

  // Se ejecuta cuando el usuario confirma en el modal
  const confirmDelete = () => {
    if (productToDelete !== null) {
      console.log("Eliminar producto con ID:", productToDelete);
      // TODO: acá va la llamada real al servicio/backend para eliminar el producto
    }
    setProductToDelete(null);
  };

  return (
    <div className="h-dvh flex flex-col overflow-hidden relative">
      <Header title="Mis Productos" />

      <main className="flex-1 min-h-0 flex flex-col">
        <ProductSearch setProductSearch={setProductSearch} />

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto pb-20">
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
            <p className="text-center text-gray-500 py-8">
              No se encontraron productos.
            </p>
          )}
        </div>
      </main>

      {/* Botón flotante fixed en la esquina inferior derecha */}
      <button
        className="fixed bottom-6 right-6 bg-violet-600 text-white p-4 rounded-full shadow-2xl hover:bg-violet-700 active:scale-95 transition-all z-50 flex items-center justify-center"
        onClick={() => console.log("Agregar producto")}
      >
        <Plus className="w-6 h-6" />
      </button>


      {/* Modal de confirmación de eliminación */}
      <ConfirmModal
        open={productToDelete !== null}
        onCancel={() => setProductToDelete(null)}
        onConfirm={confirmDelete}
      >
        ¿Seguro que querés eliminar{" "}
        <strong>{productPendingDelete?.name}</strong>?
      </ConfirmModal>

      
      <EditProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => { }}
      />
    </div>

  );
}

