'use client';

import { useEffect } from 'react';
import styles from './Header.module.css';
import { initHeader } from '../../js/headerActions.js';

function Header({ storeData }) {
  useEffect(() => {
    if (storeData) {
      initHeader(storeData);
    }
  }, [storeData]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <img 
          src="/header.png" 
          alt="Rede Única de Baterias - Bateria Automotiva com Garantia de Fábrica"
          className={styles.headerImage}
        />
      </div>
    </header>
  );
}

export default Header;