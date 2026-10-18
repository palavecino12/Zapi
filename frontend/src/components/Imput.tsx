// components/Imput.tsx
import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface ImputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
    type?: 'text' | 'number' | 'email' | 'password';
    error?: string;
}

export const Imput = forwardRef<HTMLInputElement, ImputProps>(
    ({ label, type = 'text', error, id, name, ...props }, ref) => {
        const inputId = id ?? name;

        return (
            <div className="flex w-full flex-col gap-1">
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
                <input
                    ref={ref}
                    id={inputId}
                    name={name}
                    type={type}
                    aria-invalid={!!error}
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-gray-600 ${error ? 'border-red-500' : 'border-gray-300'
                        }`}
                    {...props}
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

Imput.displayName = 'Imput';