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
import { Login } from "./pages/admin/Login";
import { AddProduct } from "./pages/admin/AddProduct";
import { Products } from "./pages/admin/Products";
import { ReviewStock } from "./pages/admin/ReviewStock";
import { Statistics } from "./pages/admin/Statistics";
import { Stock } from "./pages/admin/Stock";

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

                {/* Admin */}
            <Route path="/admin">
                <Route path="Login" element={<Login />} />
                <Route path="AddProduct" element={<AddProduct />} />
                <Route path="Products" element={<Products />} />
                <Route path="ReviewStock" element={<ReviewStock />} />
                <Route path="Statistics" element={<Statistics />} />
                <Route path="Stock" element={<Stock />} />

            </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App