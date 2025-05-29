import React from 'react';
import styles from './AlertSection.module.css';

const AlertSection = () => {
  return (
    <section className={styles.alertSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Não compre Baterias adulteradas ou "Lavadinha"
        </h2>
        
        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.primaryCard}`}>
            <h3 className={styles.cardTitle}>Pode causar:</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>Risco de Explosão</li>
              <li className={styles.listItem}>Falhas no arranque do Veículo</li>
              <li className={styles.listItem}>Desempenho Elétrico Insatisfatório</li>
              <li className={styles.listItem}>Risco de Danos no Alternador</li>
              <li className={styles.listItem}>Perigo de Vazamento de Ácido</li>
            </ul>
          </div>
          
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Como identificar:</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>Caixa danificada</li>
              <li className={styles.listItem}>Baterias sem adesivos</li>
              <li className={styles.listItem}>Verifique a Procedência</li>
              <li className={styles.listItem}>Evite Compras em Fontes Duvidosas</li>
              <li className={styles.listItem}>Verifique a Garantia</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertSection;