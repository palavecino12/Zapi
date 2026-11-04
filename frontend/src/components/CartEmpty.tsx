export const CartEmpty = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center pb-6 text-black">

            {/* Fondo orgánico */}
            <div
                className="flex h-52 w-64 items-center justify-center bg-gray-100"
                style={{
                    borderRadius: "42% 58% 63% 37% / 45% 38% 62% 55%",
                }}
            >
                <img
                    src="/cart-empty.png"
                    alt="Carrito"
                    className="h-auto w-[65vw] max-w-[220px] invert dark:invert-0"
                />
            </div>

            {/* Mensaje */}
            <h2 className="mt-5 text-2xl font-medium">
                ¡Tu carrito está vacío!
            </h2>

        </div>
    );
};