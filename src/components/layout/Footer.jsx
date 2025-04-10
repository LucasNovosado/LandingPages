import React from 'react';
import styles from './Footer.module.css';

const Footer = ({ storeData }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.paragraph}>
            Rede Única de Baterias, a maior rede de lojas de baterias automotivas do Brasil!
          </p>
          
          {storeData && (
            <p className={styles.paragraph}>
              *Entrega Grátis até 15km da loja. Consulte horários e disponibilidade.
            </p>
          )}
          
          {storeData && storeData.preco_inicial && (
            <p className={styles.paragraph}>
              **Baterias a partir de R${storeData.preco_inicial}. Única 40Ah à vista e à base de troca.
            </p>
          )}
          
          <div className={styles.logoContainer}>
            <img 
              src="/selo-qualidade.png" 
              alt="Selo de Qualidade" 
              className={styles.sealImage}
            />
          </div>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Rede Única de Baterias. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;