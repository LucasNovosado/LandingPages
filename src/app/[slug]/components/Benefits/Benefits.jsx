// Benefits.jsx
'use client';

import { getCurrentBrandConfig } from '../../../../config/brand';
import { useEffect } from 'react';
import { Clock, Award, Headphones } from 'lucide-react';
import Image from 'next/image';
import styles from './Benefits.module.css';

// Dados dos benefícios com ícones modernos
const benefitsData = [
  {
    id: 3,
    icon: <Clock className="w-12 h-12" />,
    title: "Entrega Rápida e Grátis",
    description: "Entrega Grátis até 15km da loja. Rapidez quando você mais precisa."
  },
  {
    id: 4,
    icon: <Award className="w-12 h-12" />,
    title: "Qualidade Certificada",
    description: "Produtos certificados pelo INMETRO com os mais altos padrões de qualidade."
  },
  {
    id: 6,
    icon: <Headphones className="w-12 h-12" />,
    title: "Suporte Especializado",
    description: "Atendimento técnico especializado para tirar todas as suas dúvidas."
  }
];

// Componente BenefitCard modernizado
function BenefitCard({ benefit, index }) {
  return (
    <div 
      className={styles.benefitCard}
      style={{ 
        animationDelay: `${index * 0.15}s`,
        animationFillMode: 'both'
      }}
    >
      <div className={styles.cardIconWrapper}>
        <div className={styles.cardIcon}>
          {benefit.icon}
        </div>
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

function Benefits({ storeData = {}, onCTAClick }) {
  // Obter configuração da marca atual
  const brandConfig = getCurrentBrandConfig();

  useEffect(() => {
    // Animação de entrada das cards
    const cards = document.querySelectorAll(`.${styles.benefitCard}`);
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 150);
    });
  }, []);

  // Função para lidar com o clique do WhatsApp
  const handleWhatsAppClick = () => {
    if (onCTAClick) {
      onCTAClick();
    }
  };

  return (
    <section className={styles.benefitsSection}>
      <div className={styles.container}>
        {/* Header com gradiente */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerDecoration}></div>
          <h2 className={styles.sectionTitle}>
            Por que escolher a <span className={styles.highlight}>{brandConfig.siteName}</span>?
          </h2>
        </div>
        
        {/* Benefits Grid */}
        <div className={styles.benefitsGrid}>
          {benefitsData.map((benefit, index) => (
            <BenefitCard 
              key={benefit.id} 
              benefit={benefit} 
              index={index}
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Bateria Arriou?</h3>
            {/* Action Buttons */}
            <button 
              className={`${styles.btn} ${styles.btnWhatsapp}`}
              onClick={handleWhatsAppClick}
              disabled={!storeData.link_whatsapp}
            >
              <Image
                src="/WhatsApp.svg.webp"
                alt="WhatsApp"
                width={24}
                height={24}
                className={styles.buttonIcon}
              />
              Pedir Bateria
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;