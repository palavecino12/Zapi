
type Props = {
    title?: string;
};

function Header({ title = "Mi carrito" }: Props) {
    return (
        <header className="mb-3 w-full border-b-2 border-violet-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-center text-xl font-bold tracking-tight text-violet-700">
                {title}
            </h2>
        </header>
    );
}

export default Header;
