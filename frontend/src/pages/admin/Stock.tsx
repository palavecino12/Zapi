import { useMemo, useState } from "react";
import { Check, Plus } from "lucide-react";
import { useGetProducts } from "../../hooks/useGetProducts";
import Header from "../../components/Header";
import { Button } from "../../components/Button";
import { ProductSearch } from "../../product/ProductSearch";

export function Stock() {
  const [productSearch, setProductSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const { products } = useGetProducts();

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(productSearch.trim().toLowerCase())
      ),
    [products, productSearch]
  );

  const handleAdd = (id: number) => {
    setEditingId(id);
    setAmount("");
  };

  const handleConfirmAdd = (id: number) => {
    const value = Number(amount);
    if (!value || value <= 0) return;
    console.log("Agregar stock a", id, value);
    setEditingId(null);
    setAmount("");
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
      <div className="mx-auto w-full max-w-md px-4 pb-1">
        <ProductSearch setProductSearch={setProductSearch} />
      </div>

      {/* Lista y Cards*/}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <ul className="mx-auto flex w-full max-w-md flex-col gap-3 px-4 pb-3 pt-1">
          {filtered.map((prod) => (
            <li
              key={prod.id}
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex flex-col">
                <span className="text-sm font-bold text-black">{prod.name}</span>
                <span
                  className={`text-xs ${
                    prod.stock === 0 ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  Stock: {prod.stock}
                </span>
              </div>

              {editingId === prod.id ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    inputMode="numeric"
                    autoFocus
                    min={0}
                    placeholder="Cant."
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    aria-label={`Cantidad a agregar a ${prod.name}`}
                    className="h-8 w-16 rounded-full border border-violet-600 px-2 text-center text-xs text-violet-700 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleConfirmAdd(prod.id)}
                    aria-label="Confirmar"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-white active:scale-95"
                  >
                    <Check size={14} strokeWidth={3} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAdd(prod.id)}
                  aria-label={`Agregar stock a ${prod.name}`}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-violet-600 text-violet-600 transition hover:bg-violet-50 active:scale-95"
                >
                  <Plus size={12} strokeWidth={3} />
                </button>
              )}
            </li>
          ))}

          {filtered.length === 0 && (
            <li className="py-8 text-center text-sm text-gray-400">
              No se encontraron productos
            </li>
          )}
        </ul>
      </div>

      {/* Botón Revisar Stock */}
      <div className="mx-auto w-full max-w-md px-4 pb-3 pt-4">
        <Button onClick={handleReview} className="w-full">
          Revisar Stock
        </Button>
      </div>

     
    </div>
  );
}
