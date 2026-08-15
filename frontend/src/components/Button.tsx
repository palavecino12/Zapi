import React from 'react';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primario' | 'secundario';
}

export const Button = ({ children, variant = 'primario', className = "", ...props }: ButtonProps) => {

  const styles = { 
    primario: ` text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800`,
    secundario: "text-violet-600 border border-violet-600 bg-white active:bg-violet-100"
  };

  return (

    <button
      {...props}
      className={`h-11 w-68 relative text-lg font-bold rounded-xl shadow-lg transition-all duration-150 active:scale-95 active:shadow-md ${styles[variant]} ${className}`}>
      {children}
    </button>

  );
};