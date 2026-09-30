import { useState } from "react";
import Header from "../../components/Header";
import { ProductSearch } from "../../product/ProductSearch";
import { useGetProducts } from "../../hooks/useGetProducts";
import { AdminProductItem } from "../../product/AdminProductItem";
import type { Product } from "../../types/productType";
import { Plus } from "lucide-react";

export function Products() {
  const [productSearch, setProductSearch] = useState("");
  const { products } = useGetProducts();

  // Productos filtrados por el buscador
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    console.log("Editar producto:", product);
  };

  const handleDelete = (id: number) => {
    console.log("Eliminar producto con ID:", id);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden relative">
      <Header title="Mis Productos" />

      <main className="flex-1 min-h-0 flex flex-col">
        <ProductSearch setProductSearch={setProductSearch} />

        {/* Lista con scroll interno exclusivo */}
        <div className="flex-1 overflow-y-auto pb-4">
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

      {/* Botón flotante por encima del Navbar (bottom-20) */}
      <button 
        className="fixed bottom-20 right-6 bg-violet-600 text-white p-4 rounded-full shadow-2xl hover:bg-violet-700 active:scale-95 transition-all z-40 flex items-center justify-center"
        onClick={() => console.log("Agregar producto")}
        aria-label="Agregar producto"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}