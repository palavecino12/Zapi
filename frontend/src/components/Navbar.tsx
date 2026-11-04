
import { NavLink } from "react-router-dom";
import {
  ChartNoAxesCombined,
  Package,
  Boxes,
  type LucideIcon,
} from "lucide-react";

type Tab = "Estadisticas" | "Productos" | "Stocks";

const TABS: {
  key: Tab;
  label: string;
  icon: LucideIcon;
  path: string;
}[] = [
  {
    key: "Estadisticas",
    label: "Estadísticas",
    icon: ChartNoAxesCombined,
    path: "/admin/statistics",
  },
  {
    key: "Productos",
    label: "Productos",
    icon: Package,
    path: "/admin/products",
  },
  {
    key: "Stocks",
    label: "Stocks",
    icon: Boxes,
    path: "/admin/stock",
  },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-gray-200 bg-white px-2 pb-[env(safe-area-inset-bottom)]">
      {TABS.map((tab) => (
        <NavLink
          key={tab.key}
          to={tab.path}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2.5 mx-1 my-1 transition-all duration-200 ${
              isActive
                ? "bg-violet-600 text-white shadow-sm"
                : "bg-transparent text-gray-400 hover:bg-gray-100"
            }`
          }
        >
          <tab.icon size={22} strokeWidth={1.8} />

          <span className="text-xs font-semibold">
            {tab.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
