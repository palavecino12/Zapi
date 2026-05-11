import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ViewScan } from "./pages/client/ViewScan"
import ViewInfo from "./pages/client/ViewInfo"
import { ViewCart } from "./pages/client/ViewCart"

import Success from "./components/success"
import Error from "./components/error"

function App() {

    return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<ViewCart />} />
        <Route path="/scan" element={<ViewScan />} />
        <Route path="/product" element={<ViewInfo />} />
        <Route path="/cart" element={<ViewCart />} />

        <Route path="/success" element={<Success />} />
        <Route path="/error" element={<Error />} />
        </Routes>
        </BrowserRouter>
        )
}

export default App