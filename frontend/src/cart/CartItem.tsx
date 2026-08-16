import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useCart } from "./useCart";
import type { CartItemType } from "../types/productType";

type CartItemProps = {
  product: CartItemType;
};

const CartItem = ({ product }: CartItemProps) => {

  const { removeItem, updateQuantity } = useCart();

  //Animación de entrada
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

    //Animación hacia la derecha
    api.start({
      opacity: 0,
      x: 300,
      scale: 0.95,
      config: {
        tension: 220,
        friction: 22,
      },
    });

    //Esperamos a que termine antes de eliminar
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
      className="w-screen px-2"
    >
      <div className="rounded-2xl overflow-hidden bg-white border border-gray-300 shadow-xl w-full">

        <div className="p-2 pr-0 flex items-center gap-3">

          {/* Contenido */}
          <div className="flex-1 min-w-0 flex flex-col">

            <h2 className="text-black/90 text-lg font-semibold min-w-0 truncate">
              {product.name}
            </h2>

            <p className="text-violet-600 text-lg font-semibold whitespace-nowrap">
              ${(product.price * product.quantity).toLocaleString()}
            </p>

          </div>

          {/* Contador */}
          <div className="flex items-center gap-0.5">

            <button
              onClick={() => updateQuantity(product.id, "decrement")}
              className="h-10 w-10 flex items-center justify-center text-base font-bold border border-gray-400 rounded-lg shadow-md transition-all duration-150 active:bg-gray-400 active:scale-95 active:shadow-none active:text-white"
            >
              -
            </button>

            <p className="text-black text-base font-semibold min-w-[18px] text-center">
              {product.quantity}
            </p>

            <button
              onClick={() => updateQuantity(product.id, "increment")}
              className="h-10 w-10 flex items-center justify-center text-base font-bold text-white bg-violet-600 rounded-lg shadow-md transition-all duration-150 active:bg-violet-800 active:scale-95 active:shadow-none"
            >
              +
            </button>

          </div>

          {/* Eliminar */}
          <button
            onClick={handleRemove}
            className="w-10 h-10 shrink-0 mr-2 flex items-center justify-center text-white bg-red-600/80 rounded-lg shadow-md transition-all duration-150 active:bg-red-700 active:scale-95 active:shadow-none"
          >
            <Trash2 size={16} />
          </button>

        </div>
      </div>
    </animated.div>
  );
};

export default CartItem;