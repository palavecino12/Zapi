import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ViewScan } from "./pages/client/ViewScan"
import ViewInfo from "./pages/client/ViewInfo"
import { ViewCart } from "./pages/client/ViewCart"
import { useEffect } from "react";
import { ViewProductList } from "./pages/client/ViewProductList";
import AOS from "aos";
import "aos/dist/aos.css";

import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import Success from "./components/feedback/success"
import Error from "./components/feedback/error"
import Home from "./components/Home";

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
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<ViewCart />} />
                <Route path="/scan" element={<ViewScan />} />
                <Route path="/product" element={<ViewInfo />} />
                <Route path="/list" element={<ViewProductList />} />

                <Route path="/success" element={<Success />} />
                <Route path="/error" element={<Error />} />

                <Route path="/test" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App