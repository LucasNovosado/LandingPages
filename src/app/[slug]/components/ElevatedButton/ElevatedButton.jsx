'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ElevatedButton.module.css';

function ElevatedButton({ onClick, storeData }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Mostrar o botão após 2 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Animação de pulso a cada 5 segundos
    const pulseTimer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  const handleClick = () => {
    if (onClick && storeData?.link_whatsapp) {
      onClick();
    }
  };

  if (!isVisible || !storeData?.link_whatsapp) {
    return null;
  }

  return (
    <div className={`${styles.elevatedButton} ${isAnimating ? styles.pulse : ''}`}>
      <button 
        onClick={handleClick}
        className={styles.button}
        aria-label="Abrir WhatsApp"
      >
        <div className={styles.iconContainer}>
          <Image
            src="/WhatsApp.svg.webp"
            alt="WhatsApp"
            width={32}
            height={32}
            className={styles.whatsappIcon}
          />
        </div>
        <div className={styles.ripple}></div>
      </button>
      
      <div className={styles.tooltip}>
        <span className={styles.tooltipText}>
          💬 Fale conosco no WhatsApp
        </span>
        <div className={styles.tooltipArrow}></div>
      </div>
    </div>
  );
}

export default ElevatedButton;