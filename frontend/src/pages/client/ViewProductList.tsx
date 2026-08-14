import { useCart } from "../../cart/useCart";
import { ProductList } from "../../product/ProductList";
import type { Product } from "../../types/productType";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProductSearch } from "../../product/ProductSearch";
import { ProductFilterButtons } from "../../product/ProductFilterButtons";

//Mas adelante esta variable se va a crear en base a los productos del backend.
const products: Product[] = [
    {
        id: 180001,
        code: "P001",
        name: "Coca Cola 2.25L",
        category: "Bebidas",
        price: 100,
        stock: 25,
        createdAt: "2026-07-01T10:30:00.000Z"
    },
    {
        id: 180002,
        code: "P002",
        name: "Papas Lays Clásicas",
        category: "Snacks",
        price: 1700,
        stock: 15,
        createdAt: "2026-07-01T10:35:00.000Z"
    },
    {
        id: 180003,
        code: "P003",
        name: "Agua Mineral 1.5L",
        category: "Bebidas",
        price: 2200,
        stock: 40,
        createdAt: "2026-07-01T10:40:00.000Z"
    },
    {
        id: 180004,
        code: "P004",
        name: "Alfajor Guaymallén Chocolate",
        category: "Golosinas",
        price: 800,
        stock: 30,
        createdAt: "2026-07-01T10:45:00.000Z"
    },
    {
        id: 180005,
        code: "P005",
        name: "Sprite 2.25L",
        category: "Bebidas",
        price: 1900,
        stock: 20,
        createdAt: "2026-07-01T10:50:00.000Z"
    },
    {
        id: 180006,
        code: "P006",
        name: "Chizitos 100g",
        category: "Snacks",
        price: 1200,
        stock: 18,
        createdAt: "2026-07-01T10:55:00.000Z"
    },
    {
        id: 180007,
        code: "P007",
        name: "Chocolate Milka 100g",
        category: "Golosinas",
        price: 2500,
        stock: 12,
        createdAt: "2026-07-01T11:00:00.000Z"
    },
    {
        id: 180008,
        code: "P008",
        name: "Jugo Baggio Naranja 1L",
        category: "Bebidas",
        price: 1600,
        stock: 22,
        createdAt: "2026-07-01T11:05:00.000Z"
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
    const [selected, setSelected] = useState("Todos");
    
    //Calculamos qué productos deben mostrarse utilizando el texto buscado y el filtro seleccionado
    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(productSearch.toLowerCase());

        const matchesFilter =
            selected === "Todos"
                ? true
                : product.category === selected

        return matchesSearch && matchesFilter;
    });

    return (
        <>
            {/* Buscador */}
            <ProductSearch setProductSearch={setProductSearch}/>
            {/* Botones de filtrado */}
            <ProductFilterButtons selected={selected} setSelected={setSelected}/> 
            {/* Lista de productos */}
            <ProductList products={filteredProducts} items={items} onAdd={addItem} onRemove={removeItem}/>
            {/* Boton para continuar */}
            <Button onClick={()=>navigate("/cart")}>Continuar</Button>
        </>
    )
}