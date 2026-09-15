import React from "react";

interface ImputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Imput = ({ label, icon, className = "", id, ...props }: ImputProps) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-neutral-800"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-violet-600">
            {icon}
          </span>
        )}

        <input
          id={id}
          {...props}
          className={`h-11 w-full rounded-xl border border-neutral-200 bg-white ${icon ? "pl-10" : "pl-4"} pr-4 text-sm text-neutral-800 shadow-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-200 ${className}`}
        />
      </div>
    </div>
  );
};