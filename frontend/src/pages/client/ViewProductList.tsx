import { useCart } from "../../cart/useCart";
import { ProductList } from "../../product/ProductList";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProductSearch } from "../../product/ProductSearch";
import Header from "../../components/Header";
import { useGetProducts } from "../../hooks/useGetProducts";
import { InfoModal } from "../../components/feedback/InfoModal";
import { Spinner } from "../../components/feedback/Spinner";

export const ViewProductList = () => {

    //Carrito
    const { items, addItem, removeItem } = useCart();
    const navigate = useNavigate();

    const { products, loading, error } = useGetProducts()

    //Para manejar el error de traer los productos.
    const [openModal, setOpenModal] = useState(false)
    const [prevError, setPrevError] = useState(error)
    if (error !== prevError) {
        setPrevError(error)
        if (error) setOpenModal(true)
    }

    //Almacenamos lo que ingresa el usuario
    const [productSearch, setProductSearch] = useState("")

    //Calculamos qué productos deben mostrarse utilizando el texto buscado.
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(productSearch.toLowerCase());
    });

    return (
        <>
            <div className="h-dvh flex flex-col overflow-hidden">
                <Header title="Productos" />

                {/* Buscador */}
                <main className="flex-1 flex flex-col min-h-0">
                    <div className="w-full px-2">
                        <ProductSearch setProductSearch={setProductSearch} />
                    </div>

                    {/* Lista de productos */}
                    {loading ?
                        (
                            <div className="flex-1 flex justify-center">
                                <Spinner/>
                            </div>
                        )
                        : (
                            <div className="flex-1 overflow-y-auto">
                                <ProductList products={filteredProducts} items={items} onAdd={addItem} onRemove={removeItem} />
                            </div>
                        )}

                    {/* Boton para continuar */}
                    <div className="flex justify-center py-4 shrink-0 px-3">
                        <Button onClick={() => navigate("/cart")}>Continuar</Button>
                    </div>
                </main>
            </div>

            {/* Modal para advetir de un problema no mayor */}
            <InfoModal open={openModal} onAccept={() => setOpenModal(false)} >
                <h1>{error}</h1>
            </InfoModal>
        </>

    )
}