import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}: ButtonProps) => {
  
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-semibold transition-all hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 py-3 text-base',
  };
  
  const getStyle = () => {
    switch (variant) {
      case 'primary': return { backgroundColor: 'var(--color-primary)', color: 'var(--text-inverse)' };
      case 'secondary': return { backgroundColor: 'var(--color-secondary)', color: 'var(--text-inverse)' };
      case 'danger': return { backgroundColor: 'var(--color-danger)', color: 'var(--text-inverse)' };
      case 'ghost': return { backgroundColor: 'transparent', color: 'var(--color-primary)' };
    }
  };

  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      style={getStyle()}
      {...props}
    >
      {children}
    </button>
  );
};
