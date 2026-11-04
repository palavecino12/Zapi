
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useCart } from "./useCart";
import type { CartItemType } from "../types/productType";

type CartItemProps = {
    product: CartItemType;
};

const CartItem = ({ product }: CartItemProps) => {
    const { removeItem, updateQuantity } = useCart();

    // Animación de entrada
    const [spring, api] = useSpring(() => ({
        from: {
            opacity: 0,
            x: -100,
            scale: 0.95,
        },
        config: {
            tension: 220,
            friction: 22,
        },
    }));

    useEffect(() => {
        api.start({
            opacity: 1,
            x: 0,
            scale: 1,
        });
    }, [api]);

    const handleRemove = () => {
        // Animación de salida
        api.start({
            opacity: 0,
            x: 300,
            scale: 0.95,
            config: {
                tension: 220,
                friction: 22,
            },
        });

        // Eliminar después de la animación
        setTimeout(() => {
            removeItem(product.id);
        }, 350);
    };

    return (
        <animated.div
            style={{
                opacity: spring.opacity,
                transform: spring.x.to(
                    (x) => `translate3d(${x}px, 0, 0) scale(${spring.scale.get()})`
                ),
            }}
            className="w-screen px-2 py-1"
        >
            <div className="w-full rounded-xl border border-gray-200 bg-white p-2 shadow-md">

                <div className="flex items-center gap-2">

                    {/* Información del producto */}
                    <div className="flex min-w-0 flex-1 flex-col">
                        <h2 className="truncate text-base font-semibold text-gray-800">
                            {product.name}
                        </h2>

                        <p className="text-base font-bold text-violet-600">
                            ${(product.price * product.quantity).toLocaleString()}
                        </p>
                    </div>

                    {/* Contador de unidades */}
                    <div className="flex shrink-0 items-center gap-1">

                        {/* Disminuir */}
                        <button
                            type="button"
                            onClick={() => updateQuantity(product.id, "decrement")}
                            aria-label="Disminuir cantidad"
                            className="touch-manipulation flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 shadow-sm transition-all duration-200 active:bg-gray-400 active:text-white active:shadow-inner"
                        >
                            <span className="text-lg font-semibold">−</span>
                        </button>

                        {/* Cantidad */}
                        <p className="min-w-[24px] text-center text-base font-semibold text-gray-800">
                            {product.quantity}
                        </p>

                        {/* Aumentar */}
                        <button
                            type="button"
                            onClick={() => updateQuantity(product.id, "increment")}
                            aria-label="Aumentar cantidad"
                            className="touch-manipulation flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 shadow-sm transition-all duration-200 active:bg-violet-600 active:text-white active:shadow-inner"
                        >
                            <span className="text-lg font-semibold">+</span>
                        </button>

                    </div>

                    {/* Eliminar producto */}
                    <button
                        type="button"
                        onClick={handleRemove}
                        aria-label={`Eliminar ${product.name} del carrito`}
                        className="touch-manipulation flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-200 text-red-700 shadow-sm transition-all duration-200 active:bg-red-600 active:text-white active:shadow-inner"
                    >
                        <Trash2 size={22} strokeWidth={1.8} />
                    </button>

                </div>
            </div>
        </animated.div>
    );
};

export default CartItem;
