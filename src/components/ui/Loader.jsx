import React from 'react';

const Loader = ({ size = 'md', className = '' }) => {
  // Definir classes de tamanho
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  };
  
  return (
    <div className="loader-container">
      <div 
        className={`loader ${sizeClasses[size] || sizeClasses.md} ${className}`}
        aria-label="Carregando..."
      />
    </div>
  );
};

export default Loader;