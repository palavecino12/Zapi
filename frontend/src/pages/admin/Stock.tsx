import { useMemo, useState } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import Header from "../../components/Header";
import { Button } from "../../components/Button";
import { ProductSearch } from "../../product/ProductSearch";
import { AdminProductItem } from "../../product/AdminProductItem";
import { ConfirmModal } from "../../components/feedback/ConfirmModal";
import { EditProductModal } from "../../product/EditProductModal";
import type { Product } from "../../types/productType";

export function Stock() {
  const [productSearch, setProductSearch] = useState("");
  const { products } = useGetProducts();

  // Producto que se está editando (null = modal de editar cerrado)
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // ID del producto que se está por eliminar (null = ningún modal abierto)
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const productPendingDelete = products.find((p) => p.id === productToDelete);

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(productSearch.trim().toLowerCase())
      ),
    [products, productSearch]
  );

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
  };

  const handleDelete = (id: number) => {
    setProductToDelete(id);
  };

  const confirmDelete = () => {
    if (productToDelete !== null) {
      console.log("Eliminar producto con ID:", productToDelete);
      // TODO: acá va la llamada real al servicio/backend para eliminar el producto
    }
    setProductToDelete(null);
  };

  const confirmEdit = () => {
    console.log("Editar producto:", productToEdit);
    // TODO: acá va la llamada real al servicio/backend para editar el producto
    setProductToEdit(null);
  };

  const handleReview = () => {
    // "Revisar stock", solo muestra en consola
    console.log("Revisar stock");
  };

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-white">
      {/*  Header  */}
      <div className="relative z-10">
        <Header title="Stocks" />
      </div>

      {/* Buscador */}
      <div className="px-4 pb-1">
        <ProductSearch setProductSearch={setProductSearch} />
      </div>

      {/* Lista y Cards*/}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="pb-3 pt-1">
          {filtered.map((prod) => (
            <AdminProductItem
              key={prod.id}
              product={prod}
              showStock
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}

          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-400">
              No se encontraron productos
            </p>
          )}
        </div>
      </div>

      {/* Botón Revisar Stock */}
      <div className="px-4 pb-3 pt-4">
        <Button onClick={handleReview} className="w-full">
          Revisar Stock
        </Button>
      </div>

      {/* Modal de confirmación de eliminación */}
      <ConfirmModal
        open={productToDelete !== null}
        onCancel={() => setProductToDelete(null)}
        onConfirm={confirmDelete}
      >
        ¿Seguro que querés eliminar <strong>{productPendingDelete?.name}</strong>?
      </ConfirmModal>

      {/* Modal de edición de producto */}
      <EditProductModal
        open={productToEdit !== null}
        onClose={() => setProductToEdit(null)}
        onConfirm={confirmEdit}
      />
    </div>
  );
}

