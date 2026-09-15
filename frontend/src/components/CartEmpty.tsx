export const CartEmpty = () => {
    return (
    <div className="flex-1 flex flex-col justify-center items-center pb-6 text-black dark:text-white">
        <img 
            src="/cart-empty.png" 
            alt="Carrito" 
            // 'invert' lo vuelve oscuro en el modo claro (si el original era blanco)
            // 'dark:invert-0' (o simplemente quitarlo) deja el icono blanco original en el modo oscuro
            className="w-[65vw] max-w-[330px] h-auto invert dark:invert-0" 
        />
        <h2 className="font-medium text-2xl text-center">
            ¡Tu carrito está vacío!
        </h2>
    </div>
)
}