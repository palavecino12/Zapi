export const CartEmpty = () => {
    return (
        <div className=" flex-1 flex flex-col justify-center items-center pb-6 ">
            <img src="/cart-empty.png" alt="Carrito" className=" w-[65vw] max-w-[330px] h-auto " />
            <h2 className=" font-medium text-2xl text-center ">
                ¡Tu carrito está vacío!
            </h2>
        </div>
    )
}