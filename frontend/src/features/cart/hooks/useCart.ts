
import { useContext } from "react";
import { CartContext } from "../context/cart.context";

//Este useCart lo creamos para usarlo en vez del useContext, ya que para usar el useContext
//tendriamos que importar el CartContext que recibe por parametro cada vez que lo querramos usar.
export const useCart = () => {

    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart debe usarse dentro de CartProvider");
    }

    return context;
};