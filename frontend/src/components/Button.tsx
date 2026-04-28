import React from 'react';


interface ButtonProps {
  variant?: 'primario' | 'secundario';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = ({children, variant = 'primario', onClick,}: ButtonProps) => {

  const styles = {
    primario:
      "text-white bg-gradient-to-r from-orange-400 to-orange-500",
    secundario:
      "text-orange-500 border border-orange-500",
  };

  return (
    <button onClick={onClick}
      className={`h-12 w-70 relative text-lg font-bold rounded-xl shadow-lg transition-all duration-150
        transform active:scale-95 ${styles[variant]}`}>
    {children}
    </button>
  );
};