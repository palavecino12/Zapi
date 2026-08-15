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

import { SuccessFeedback } from "./components/feedback/SuccessFeedback"
import { ErrorFeedback } from "./components/feedback/ErrorFeedback"
import Home from "./components/Home";
import { Loading } from "./components/feedback/Loading";

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

                <Route path="/success" element={<SuccessFeedback />} />
                <Route path="/error" element={<ErrorFeedback />} />
                <Route path="/loading" element={<Loading />} />

                <Route path="/test" element={<ErrorFeedback />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App