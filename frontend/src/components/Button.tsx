import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'danger' | 'success';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = ({ children, variant = 'primary', onClick }: ButtonProps) => {
  const styles = {
    primary: "bg-orange-400 hover:bg-orange-500 text-white",
    danger: "bg-orange-400 hover:bg-orange-500 text-white",
    success: "bg-orange-400 hover:bg-orange-500 text-white"
  };

  return (
    <button
      onClick={onClick}
      className={`block mx-auto px-4 py-2 rounded-2xl shadow-sm transition-colors ${styles[variant]}`}
    >
      {children}
    </button>
  );
};