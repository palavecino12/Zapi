type Props = {
    title?: string
}

function Header({ title = "Mi carrito" }: Props) {
    return (
        <div className="w-full bg-violet-600 px-4 py-3 mb-3 shadow-lg">
            <h2 className="text-white text-lg font-semibold flex center-items justify-center">
                {title}
            </h2>
        </div>
    )
}

export default Header