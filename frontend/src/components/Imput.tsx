interface ImputProps {
    label: string;
    placeholder: string;
    type?: "text" | "number" | "email" | "password";
}

export function Imput({label,placeholder, type = "text",}: ImputProps) {
    return (
        <div className="flex w-full flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input type={type} placeholder={placeholder} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-purple-500"/>
        </div>
    );
}