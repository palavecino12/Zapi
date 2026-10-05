import { NavLink } from "react-router-dom";

type Tab = "Estadisticas" | "Productos" | "Stocks";

const TABS: {
  key: Tab;
  label: string;
  icon: string;
  path: string;
}[] = [
    {
      key: "Estadisticas",
      label: "Estadísticas",
      icon: "📊",
      path: "/admin/statistics",
    },
    {
      key: "Productos",
      label: "Productos",
      icon: "📦",
      path: "/admin/products",
    },
    {
      key: "Stocks",
      label: "Stocks",
      icon: "📋",
      path: "/admin/stock",
    },
  ];

export default function Navbar() {
  return (
    <nav className="flex border-t border-gray-100 bg-white py-2 pb-3.5">
      {TABS.map((tab) => (
        <NavLink
          key={tab.key}
          to={tab.path}
          className="flex flex-1 flex-col items-center justify-center"
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${isActive ? "bg-purple-100" : ""
                  }`}
              >
                {tab.icon}
              </span>

              <span
                className={`mt-0.5 text-[11px] ${isActive
                    ? "font-semibold text-purple-600"
                    : "text-gray-400"
                  }`}
              >
                {tab.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}