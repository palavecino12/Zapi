
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

// Client
import Home from "./components/Home";
import { ViewScan } from "./pages/client/ViewScan";
import { ViewCart } from "./pages/client/ViewCart";
import { ViewProductList } from "./pages/client/ViewProductList";

// Admin
import AppLayout from "./layout/appLayout";
import { Login } from "./pages/admin/Login";
import { Products } from "./pages/admin/Products";
import { Statistics } from "./pages/admin/Statistics";
import { Stock } from "./pages/admin/Stock";
import { AddProduct } from "./pages/admin/AddProduct";
import { ReviewStock } from "./pages/admin/ReviewStock";
import { ReviewStockResultPage } from "./pages/admin/ReviewStockResult";

// Feedback
import { SuccessFeedback } from "./components/feedback/SuccessFeedback";
import { ErrorFeedback } from "./components/feedback/ErrorFeedback";
import { Loading } from "./components/feedback/Loading";

// Other
import Navbar from "./components/Navbar";
import { NotFound } from "./components/NotFound";

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

                {/* Client */}
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<ViewCart />} />
                <Route path="/scan" element={<ViewScan />} />
                <Route path="/list" element={<ViewProductList />} />

                {/* Feedback */}
                <Route path="/success" element={<SuccessFeedback />} />
                <Route path="/error" element={<ErrorFeedback />} />
                <Route path="/loading" element={<Loading />} />

                {/* Admin */}
                <Route path="/admin">

                    {/* Redirect */}
                    <Route index element={<Navigate to="login" replace />} />

                    {/* Login */}
                    <Route path="login" element={<Login />} />

                    {/* Admin pages with layout */}
                    <Route element={<AppLayout />}>
                        <Route path="products" element={<Products />} />
                        <Route path="statistics" element={<Statistics />} />
                        <Route path="stock" element={<Stock />} />
                    </Route>

                    {/* Admin pages without layout */}
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="review-stock" element={<ReviewStock />} />
                    <Route
                        path="review-stock-result"
                        element={<ReviewStockResultPage />}
                    />

                </Route>

                {/* Test */}
                <Route path="/test" element={<Navbar />} />

                {/* Not found */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
