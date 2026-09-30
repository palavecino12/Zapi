import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppLayout() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white">
      {/* Contenedor principal que ocupa todo el espacio disponible */}
      <main className="flex-1 min-h-0 overflow-hidden">
        <Outlet />
      </main>

      {/* Navbar fijo al fondo sin solaparse */}
      <footer className="shrink-0 z-50 bg-white">
        <Navbar />
      </footer>
    </div>
  );
}