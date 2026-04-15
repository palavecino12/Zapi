import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'danger' | 'success';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = ({ children, variant = 'primary', onClick }: ButtonProps) => {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white"
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded shadow-md transition-colors ${styles[variant]}`}
    >
      {children}
    </button>
  );
};