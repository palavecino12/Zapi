import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ViewScan } from "./pages/client/ViewScan"
import ViewInfo from "./pages/client/ViewInfo"
import { ViewCart } from "./pages/client/ViewCart"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ViewCart />} />
                <Route path="/scan" element={<ViewScan />} />
                <Route path="/product" element={<ViewInfo />} />
                <Route path="/cart" element={<ViewCart />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App