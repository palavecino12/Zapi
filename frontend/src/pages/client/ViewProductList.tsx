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