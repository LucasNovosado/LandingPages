import React from 'react';
import Link from 'next/link';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  href, 
  className = '', 
  icon,
  fullWidth = false,
  onClick, 
  ...props 
}) => {
  // Determinar as classes do botão com base nas props
  const baseClasses = 'btn flex items-center justify-center font-semibold';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    whatsapp: 'btn-whatsapp',
    call: 'btn-call',
    outline: 'btn-outline',
  };
  
  const sizeClasses = {
    sm: 'text-sm py-2 px-4',
    md: 'py-3 px-6',
    lg: 'btn-lg',
  };
  
  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant] || variantClasses.primary} 
    ${sizeClasses[size] || sizeClasses.md}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  // Se tiver um ícone, renderiza o ícone antes do texto
  const buttonContent = (
    <>
      {icon && <span className="btn-icon mr-2">{icon}</span>}
      {children}
    </>
  );

  // Se tiver uma href, renderiza como Link do Next.js
  if (href) {
    return (
      <Link href={href} className={buttonClasses} onClick={onClick} {...props}>
        {buttonContent}
      </Link>
    );
  }

  // Caso contrário, renderiza como botão normal
  return (
    <button type={type} className={buttonClasses} onClick={onClick} {...props}>
      {buttonContent}
    </button>
  );
};

export default Button;