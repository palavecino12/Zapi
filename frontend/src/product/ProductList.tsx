//Este componente se va a usar para listar los productos de la base de datos.

import type { CartItemType, Product } from "../types/productType"
import { ProductListItem } from "./ProductListItem"

type ProductListProp = {
    products: Product[],
    items: CartItemType[],
    onAdd: (product: Product) => void;
    onRemove: (id: number) => void;
}

export const ProductList = ({ products, items, onAdd, onRemove }: ProductListProp) => {

    return (
        <div>
            {products.map((product => (
                <ProductListItem
                    key={product.id}
                    product={product}
                    selected={items.some(item=>item.id===product.id)}//Observamos si el producto esta en el carrito y devolvemos true o false.
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
            )))}
        </div>
    )

}