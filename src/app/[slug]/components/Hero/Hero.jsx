'use client';

import styles from './Hero.module.css';
import { formatPrice } from '../../js/heroActions.js';
import Image from 'next/image';

function Hero({ storeData, onWhatsAppClick, onCallClick }) {
  return (
    <section style={{ margin: 0, padding: 0, width: '100%' }}>
      {/* Header centralizado no topo da section - apenas no desktop */}
      <div className={styles.headerContent}>
        <img 
          src="/header.png" 
          alt="Rede Única de Baterias - Bateria Automotiva com Garantia de Fábrica"
          className={styles.headerImage}
        />
      </div>
      
      <div className={styles.heroGrid}>
        
        {/* Hero Content */}
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>
            <br />
            <span style={{ 
              background: 'linear-gradient(45deg, #fbbf24,rgb(255, 217, 0))', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
            Bateria Urgente em
            </span><br></br>
            {storeData.cidade}
          </h2>
          
          {/* Desktop Image - aparece logo após a cidade no desktop */}
          <div className={styles.desktopImageInContent}>
            {storeData.imagem_produto ? (
              <div className={styles.imageContainer}>
                <img 
                  src={storeData.imagem_produto}
                  alt={`Bateria Automotiva - ${storeData.cidade}`}
                  className={styles.productImage}
                  loading="eager"
                />
              </div>
            ) : (
              <div className={styles.placeholderImage}>
                <div className={styles.placeholderIcon}>🔋</div>
                <p className={styles.placeholderText}>Bateria Automotiva Premium</p>
                <p className={styles.placeholderSubtext}>Qualidade Garantida</p>
              </div>
            )}
          </div>

          {/* Mobile Image - só aparece no mobile */}
          <div className={styles.mobileImage}>
            {/* Header também aparece no mobile dentro do mobileImage */}
            <div className={styles.headerContent}>
              <img 
                src="/header.png" 
                alt="Rede Única de Baterias - Bateria Automotiva com Garantia de Fábrica"
                className={styles.headerImage}
              />
            </div>
            
            {storeData.imagem_produto ? (
              <img 
                src={storeData.imagem_produto}
                alt={`Bateria Automotiva - ${storeData.cidade}`}
                className={styles.productImage}
                loading="eager"
              />
            ) : (
              <div className={styles.placeholderImage}>
                <div className={styles.placeholderIcon}>🔋</div>
                <p className={styles.placeholderText}>Bateria Automotiva Premium</p>
                <p className={styles.placeholderSubtext}>Qualidade Garantida</p>
              </div>
            )}
          </div>
          

{/* Price Section */}
{storeData.preco_inicial && (
  <div className={styles.priceContainer}>
    {/* priceValue fica sempre no topo */}
    <div className={styles.priceValue}>
      A partir de R$ {formatPrice(storeData.preco_inicial) || storeData.preco_inicial}
    </div>
    
    {/* Container para priceHighlight e priceDetails */}
    <div className={styles.priceDetailsContainer}>
      <span className={styles.priceHighlight}>
        ✅ Entrega e Instalação GRÁTIS
      </span>
      <p className={styles.priceDetails}>
        💳 Parcele em até 12x no Cartão
      </p>
    </div>
  </div>
)}
          {/* Action Buttons */}
          <div className={styles.buttonsContainer}>
            <button 
              className={`${styles.btn} ${styles.btnWhatsapp}`}
              onClick={onWhatsAppClick}
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
            
            {storeData.telefone && (
              <button 
                className={`${styles.btn} ${styles.btnCall}`}
                onClick={onCallClick}
              >
                <Image
                  src="/telicon.webp"
                  alt="Telefone"
                  width={24}
                  height={24}
                  className={styles.buttonIcon}
                />
                Ligar Agora
              </button>
            )}
          </div>
        </div>
        
        {/* Desktop Image - coluna lateral removida */}
        <div className={styles.desktopImage}>
          {/* Esta div agora está vazia - a imagem foi movida para dentro do heroContent */}
        </div>
        
      </div>
    </section>
  );
}

export default Hero;