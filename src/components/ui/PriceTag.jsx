import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const PriceTag = ({ 
  price, 
  originalPrice, 
  size = 'md', 
  showFrom = true, 
  className = '' 
}) => {
  // Determinar o tamanho do preço
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };
  
  const priceClass = `font-bold ${sizeClasses[size] || sizeClasses.md} ${className}`;
  
  // Se tiver preço original, mostra o desconto
  if (originalPrice && originalPrice > price) {
    const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
    
    return (
      <div className="price-tag">
        {showFrom && <span className="text-sm text-gray-600">A partir de</span>}
        <div className="flex items-center gap-2">
          <span className={priceClass}>{formatCurrency(price)}</span>
          <span className="text-sm line-through text-gray-500">{formatCurrency(originalPrice)}</span>
          <span className="text-sm font-semibold bg-green-600 text-white px-2 py-1 rounded">
            -{discountPercent}%
          </span>
        </div>
      </div>
    );
  }
  
  // Caso contrário, mostra apenas o preço
  return (
    <div className="price-tag">
      {showFrom && <span className="text-sm text-gray-600">A partir de</span>}
      <span className={priceClass}>{formatCurrency(price)}</span>
    </div>
  );
};

export default PriceTag;