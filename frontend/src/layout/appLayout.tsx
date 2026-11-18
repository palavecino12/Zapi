
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppLayout() {
    return (
        <div className="min-h-dvh">
            <main className="pb-20">
                <Outlet />
            </main>

            <Navbar />
        </div>
    );
}
