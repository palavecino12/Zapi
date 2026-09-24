import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function AppLayout() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      {/* Contenido de las rutas */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Navbar fijo abajo */}
      <div className="shrink-0">
        <Navbar />
      </div>
    </div>
  );
}