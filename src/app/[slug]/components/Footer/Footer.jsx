'use client';

import { useEffect } from 'react';
import styles from './Footer.module.css';
import { initFooter } from '../../js/footerActions.js';

function Footer({ storeData }) {
  useEffect(() => {
    if (storeData) {
      initFooter(storeData);
    }
  }, [storeData]);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={`${styles.footerCopyright} footerCopyright`}>
          &copy; {new Date().getFullYear()} Rede Única de Baterias. Todos os direitos reservados.
        </p>
        <p className={styles.footerTagline}>
          🔋 A maior rede de lojas de baterias automotivas do Brasil!
        </p>
        
        {/* Additional Footer Info */}
        {storeData.cidade && (
          <p className={styles.footerLocation}>
            Atendendo {storeData.cidade} e região
          </p>
        )}
      </div>
    </footer>
  );
}

export default Footer;