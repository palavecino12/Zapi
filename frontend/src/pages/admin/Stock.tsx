import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChartColumn, List, Package, Plus, type LucideIcon } from "lucide-react";
import { useGetProducts } from "../../hooks/useGetProducts";
import Header from "../../components/Header";
import { Button } from "../../components/Button";
import { ProductSearch } from "../../product/ProductSearch";

export function Stock() {
  const [productSearch, setProductSearch] = useState("");
  const { products } = useGetProducts();

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(productSearch.trim().toLowerCase())
      ),
    [products, productSearch]
  );

  const handleAdd = (id: number) => {
    // "+" Solo muestra en consola
    console.log("Agregar stock a", id);
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

              <button
                type="button"
                onClick={() => handleAdd(prod.id)}
                aria-label={`Agregar stock a ${prod.name}`}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-violet-600 text-violet-600 transition hover:bg-violet-50 active:scale-95"
              >
                <Plus size={12} strokeWidth={3} />
              </button>
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

      {/* Navegación inferior */}
      <nav className="w-full border-t border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-md items-center justify-around px-4 py-2">
          <NavItem to="/admin/Statistics" label="Estadísticas" icon={ChartColumn} />
          <NavItem to="/admin/Products" label="Productos" icon={Package} />
          <NavItem to="/admin/Stock" label="Stocks" icon={List} />
        </div>
      </nav>
    </div>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 rounded-lg border px-4 py-1.5 text-xs transition ${
          isActive
            ? "border-violet-500 bg-violet-50 font-bold text-violet-700"
            : "border-transparent font-medium text-gray-600"
        }`
      }
    >
      <Icon size={16} />
      {label}
    </NavLink>
  );
}
