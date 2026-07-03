import { useCart } from "../../cart/useCart";
import { ProductList } from "../../product/ProductList";
import type { Product } from "../../types/product.types";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

//Mas adelante esta variable se va a crear en base a los productos del backend.
const products: Product[] = [
    {
        id: 1,
        code: "P001",
        name: "Coca Cola 2.25L",
        price: 3500,
        stock: 25,
        createdAt: "2026-07-01T10:30:00.000Z"
    },
    {
        id: 2,
        code: "P002",
        name: "Papas Lays Clásicas",
        price: 1800,
        stock: 15,
        createdAt: "2026-07-01T10:35:00.000Z"
    },
    {
        id: 3,
        code: "P003",
        name: "Agua Mineral 1.5L",
        price: 1200,
        stock: 40,
        createdAt: "2026-07-01T10:40:00.000Z"
    },
];


export const ViewProductList = () => {

    const { items, addItem, removeItem } = useCart();
    const navigate = useNavigate();

    //Aca tendria que ir el hook para traer todos los productos del back y guardarlo en la variable products

    //Aca deben ir los state para los filtros y el buscador (almacenamos ambos valores)

    //Tambien una funcion que filtre todos los productos segun los filtros y este resultado se lo pasamos a la lista

    return (
        <>
            <ProductList products={products} items={items} onAdd={addItem} onRemove={removeItem}/>

            <Button onClick={()=>navigate("/cart")}>Continuar</Button>
        </>
    )
}