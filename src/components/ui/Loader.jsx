import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ size = 'md', className = '' }) => {
  // Definir classes de tamanho
  const sizeClass = styles[size] || styles.medium;
  
  return (
    <div className={styles.loaderContainer}>
      <div 
        className={`${styles.spinner} ${sizeClass} ${className}`}
        aria-label="Carregando..."
      />
    </div>
  );
};

export default Loader;