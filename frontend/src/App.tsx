import { BrowserRouter, Route, Routes } from "react-router-dom"
import ViewHome from "./pages/client/ViewHome"
import { ViewScan } from "./pages/client/ViewScan"
import ViewInfo from "./pages/client/ViewInfo"
import { ViewCart } from "./pages/client/ViewCart"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ViewHome/>}/>
                <Route path="/scan" element={<ViewScan/>}/>
                <Route path="/product" element={<ViewInfo/>}/>
                <Route path="/cart" element={<ViewCart/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App