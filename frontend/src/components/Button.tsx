import React from 'react';


interface ButtonProps {
  variant?: 'primario' | 'secundario';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = ({children, variant = 'primario', onClick,}: ButtonProps) => {

  const styles = {
    primario: ` text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800`,
    secundario: `text-violet-600 border border-violet-600 bg-white hover:bg-violet-50 active:bg-violet-100`,
  };
  
  return (

    <button
      onClick={onClick} className={`h-12 w-70 relative text-lg font-bold rounded-xl shadow-lg transition-all duration-150 active:scale-95 active:shadow-md hover:scale-[1.02] ${styles[variant]}`}>
      {children}
    </button>

  );
};