import { useCart } from "../../cart/useCart";
import { ProductList } from "../../product/ProductList";
import type { Product } from "../../types/productType";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProductSearch } from "../../product/ProductSearch";
import  Header from "../../components/Header";
//import { ProductFilterButtons } from "../../product/ProductFilterButtons";

//Mas adelante esta variable se va a crear en base a los productos del backend.
const products: Product[] = [
    {
        id: 180001,
        code: "P001",
        name: "Coca Cola 2.25L",
        category:"Bebidas",
        price: 1800,
        stock: 25,
        createdAt: "2026-07-01T10:30:00.000Z"
    },
    {
        id: 180002,
        code: "P002",
        name: "Papas Lays Clásicas",
        category:"Snacks",
        price: 1700,
        stock: 15,
        createdAt: "2026-07-01T10:35:00.000Z"
    },
    {
        id: 180003,
        code: "P003",
        name: "Agua Mineral 1.5L",
        category:"Bebidas",
        price: 2200,
        stock: 40,
        createdAt: "2026-07-01T10:40:00.000Z"
    },
       {
        id: 180004,
        code: "P004",
        name: "Galletitas Oreo",
        category:"Snacks",
        price: 2200,
        stock: 40,
        createdAt: "2026-07-01T10:50:00.000Z"
    },
        {
        id: 180005,
        code: "P005",
        name: "Sprite 2.25L",
        category:"Bebidas",
        price: 2100,
        stock: 25,
        createdAt: "2026-07-01T10:55:00.000Z"
    },
        {
        id: 180006,
        code: "P006",
        name: "Fanta 1.5L",
        category:"Bebidas",
        price: 1800,
        stock: 25,
        createdAt: "2026-07-01T11:00:00.000Z"
    },
            {
        id: 180007,
        code: "P007",
        name: "Gomitas Mogul",
        category:"Golosinas",
        price: 600,
        stock: 25,
        createdAt: "2026-07-01T11:05:00.000Z"
    },
            {
        id: 180008,
        code: "P008",
        name: "Cepita Naranja 1L",
        category:"Bebidas",
        price: 1500,
        stock: 25,
        createdAt: "2026-07-01T11:10:00.000Z"
    },
            {
        id: 180009,
        code: "P009",
        name: "Saladix",
        category:"Snacks",
        price: 1200,
        stock: 25,
        createdAt: "2026-07-01T11:15:00.000Z"
    },
                {
        id: 180010,
        code: "P010",
        name: "Chocolate Hamlet",
        category:"Golosinas",
        price: 800,
        stock: 25,
        createdAt: "2026-07-01T11:20:00.000Z"
    },

            {
        id: 180011,
        code: "P011",
        name: "Cepita Durazno 1L",
        category:"Bebidas",
        price: 1500,
        stock: 25,
        createdAt: "2026-07-01T11:25:00.000Z"
    },
            {
        id: 180012,
        code: "P012",
        name: "Doritos",
        category:"Snacks",
        price: 1200,
        stock: 25,
        createdAt: "2026-07-01T11:30:00.000Z"
    },
                {
        id: 180013,
        code: "P013",
        name: "Chocolate Cofler",
        category:"Golosinas",
        price: 800,
        stock: 25,
        createdAt: "2026-07-01T11:35:00.000Z"
    },
];


export const ViewProductList = () => {
    
    //Carrito
    const { items, addItem, removeItem } = useCart();
    const navigate = useNavigate();

    //Aca tendria que ir el hook para traer todos los productos del back y guardarlo en la variable products

    //Almacenamos lo que ingresa el usuario
    const [productSearch, setProductSearch] = useState("")
    //Almacenamos el filtro que aplica el usuario
    //const [selected, setSelected] = useState("Todos");
    
    //Calculamos qué productos deben mostrarse utilizando el texto buscado y el filtro seleccionado
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(productSearch.toLowerCase());
    });
    //    const matchesSearch =
    //        product.name
    //            .toLowerCase()
    //            .includes(productSearch.toLowerCase());

    //    const matchesFilter =
    //        selected === "Todos"
    //            ? true
    //            : product.category === selected
    //
    //    return matchesSearch && matchesFilter;
    //});

    return (
        <div className="h-dvh flex flex-col overflow-hidden">
            <Header />

                {/* Buscador */}
                <main className="flex-1 flex flex-col min-h-0">
                    <div className="w-full py-3">
                      <ProductSearch setProductSearch={setProductSearch}/>
                    </div>
                {/* Botones de filtrado */}
                {/*<ProductFilterButtons selected={selected} setSelected={setSelected}/> */} 
                
                {/* Lista de productos */}
                <div className="flex-1 overflow-y-auto">
                    <ProductList products={filteredProducts} items={items} onAdd={addItem} onRemove={removeItem}/>
                </div>
                
                {/* Boton para continuar */}
                <div className="flex justify-center">
                <Button onClick={()=>navigate("/cart")}>Continuar</Button>
                </div>
            </main>
        </div>
    )
}