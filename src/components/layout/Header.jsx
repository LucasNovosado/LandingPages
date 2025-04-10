import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = ({ storeData }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className="block">
            <img 
              src="/logo.png" 
              alt="Rede Única de Baterias" 
              className={styles.logo}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;