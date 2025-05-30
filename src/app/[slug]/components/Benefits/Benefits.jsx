'use client';

import { useEffect } from 'react';
import styles from './Benefits.module.css';
import commonStyles from '../Common.module.css';
import { defaultBenefits, initBenefitsSection } from '../../js/benefitsData.js';

// Componente BenefitCard interno
function BenefitCard({ benefit, index }) {
  return (
    <div 
      className={styles.card} 
      data-benefit-card
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className={styles.cardIcon}>
        {benefit.icon}
      </div>
      <h3 className={styles.cardTitle}>
        {benefit.title}
      </h3>
      <p className={styles.cardDescription}>
        {benefit.description}
      </p>
    </div>
  );
}

function Benefits({ storeData, onCTAClick }) {
  const benefits = defaultBenefits;

  useEffect(() => {
    initBenefitsSection();
  }, []);

  return (
    <section className={`${commonStyles.section} ${commonStyles.sectionGray}`}>
      <div className={commonStyles.sectionContent}>
        <h2 className={commonStyles.sectionTitle}>
          Por que comprar com a Rede Única?
        </h2>
        
        {/* Benefits Grid */}
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={benefit.id} 
              benefit={benefit} 
              index={index}
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <button 
            className={`${styles.btn} ${styles.btnWhatsapp}`}
            onClick={onCTAClick}
            disabled={!storeData.link_whatsapp}
          >
            <span>💬</span>
            Pedir Bateria Agora
          </button>
        </div>
      </div>
    </section>
  );
}

export default Benefits;