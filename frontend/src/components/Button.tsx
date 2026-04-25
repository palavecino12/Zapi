import React from 'react';

interface ButtonProps {
  variant?: 'primario' | 'secundario';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = ({children, variant = 'primario', onClick,}: ButtonProps) => {

  const styles = {
    primario:
      "text-white bg-gradient-to-r from-orange-400 to-orange-600",
    secundario:
      "text-white bg-gradient-to-r from-red-500 to-red-700 active:bg-gray-200",
  };

  return (
    <button onClick={onClick}
      className={`relative max-w-sm mx-auto px-12 py-3 text-lg font-bold rounded-2xl shadow-lg transition-all duration-150
        transform active:scale-95 ${styles[variant]}`}>
    {children}
    </button>
  );
};