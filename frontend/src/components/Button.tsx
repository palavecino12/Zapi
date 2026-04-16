import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'danger' | 'success';
  onClick?: () => void;
  children: React.ReactNode;
  loading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  onClick,
  loading = false
}: ButtonProps) => {
  const styles = {
    primary:
      "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700",
    danger:
      "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800",
    success:
      "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        relative
        w-full max-w-sm mx-auto
        px-6 py-3
        text-lg font-bold text-white
        rounded-2xl
        shadow-lg
        transition-all duration-300
        transform
        active:scale-95
        hover:scale-105
        hover:shadow-xl
        ${styles[variant]}
        ${loading ? 'opacity-60 cursor-not-allowed' : ''}
      `}
    >
      {/* Glow effect */}
      <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 hover:opacity-100 transition duration-300"></span>

      {/* Content */}
      <span className="relative z-10">
        {loading ? "Cargando..." : children}
      </span>
    </button>
  );
};