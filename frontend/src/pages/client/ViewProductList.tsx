//import CarList from "../../cart/CartList"
import { useCart } from "../../cart/useCart";
import { ProductListItem } from "../../product/ProductListItem";
import type { CartItemType } from "../../types/product.types";

//const cartItems: CartItemType[] = [
//    {
//        id: 1,
//        code: "P001",
//        name: "Coca Cola 2.25L",
//        price: 3500,
//        stock: 25,
//        createdAt: "2026-07-01T10:30:00.000Z",
//        quantity: 2,
//    },
//    {
//        id: 2,
//        code: "P002",
//        name: "Papas Lays Clásicas",
//        price: 1800,
//        stock: 15,
//        createdAt: "2026-07-01T10:35:00.000Z",
//        quantity: 1,
//    },
//    {
//        id: 3,
//        code: "P003",
//        name: "Agua Mineral 1.5L",
//        price: 1200,
//        stock: 40,
//        createdAt: "2026-07-01T10:40:00.000Z",
//        quantity: 3,
//    },
//];

const product: CartItemType =
{
    id: 1,
    code: "P001",
    name: "Coca Cola 2.25L",
    price: 3500,
    stock: 25,
    createdAt: "2026-07-01T10:30:00.000Z",
    quantity: 2,
}

export const ViewProductList = () => {

    const { items, addItem, removeItem } = useCart();

    return (
        <ProductListItem
            product={product}
            selected={items.some(item => item.id === product.id)}//Observamos si el producto esta en el carrito y devolvemos true o false.
            onAdd={addItem}
            onRemove={removeItem}
        />
    )
}