'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { initializeParse, getStoreBySlug } from '../../services/parseService';

// Import modular CSS
import commonStyles from './styles/Common.module.css';
import headerStyles from './styles/Header.module.css';
import heroStyles from './styles/Hero.module.css';
import benefitsStyles from './styles/Benefits.module.css';
import storeInfoStyles from './styles/StoreInfo.module.css';
import footerStyles from './styles/Footer.module.css';

// Import JavaScript controllers
import { pageController } from './js/pageController.js';
import { 
  handleWhatsAppClick, 
  handleCallClick, 
  formatPrice 
} from './js/heroActions.js';
import { 
  handleBenefitsCTA, 
  defaultBenefits 
} from './js/benefitsData.js';
import { 
  handleMapClick, 
  formatPhoneNumber 
} from './js/storeInfoActions.js';

export default function StorePage() {
  const params = useParams();
  const router = useRouter();
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load store data
  useEffect(() => {
    const loadStore = async () => {
      if (!params.slug) return;
      
      try {
        setLoading(true);
        initializeParse();
        const store = await getStoreBySlug(params.slug);
        
        if (!store) {
          setError('Loja não encontrada');
          return;
        }
        
        setStoreData(store);
      } catch (err) {
        console.error('Erro ao carregar loja:', err);
        setError('Erro ao carregar os dados da loja');
      } finally {
        setLoading(false);
      }
    };

    loadStore();
  }, [params.slug]);

  // Initialize page controller when store data is loaded
  useEffect(() => {
    if (storeData && !loading && !error) {
      pageController.init(storeData).catch(err => {
        console.error('Failed to initialize page controller:', err);
      });
    }
  }, [storeData, loading, error]);

  // Event handlers
  const handleWhatsApp = () => {
    if (storeData?.link_whatsapp) {
      handleWhatsAppClick(storeData.link_whatsapp);
    }
  };

  const handleCall = () => {
    if (storeData?.telefone) {
      handleCallClick(storeData.telefone);
    }
  };

  const handleMap = () => {
    if (storeData?.link_maps) {
      handleMapClick(storeData.link_maps, storeData.cidade);
    }
  };

  const handleBenefitsCTAClick = () => {
    if (storeData?.link_whatsapp) {
      handleBenefitsCTA(storeData.link_whatsapp, storeData.cidade);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={commonStyles.loaderContainer}>
        <div className={commonStyles.loader}></div>
      </div>
    );
  }

  // Error state
  if (error || !storeData) {
    return (
      <div className={commonStyles.errorContainer}>
        <div className={commonStyles.errorCard}>
          <h1 className={commonStyles.errorTitle}>Loja não encontrada</h1>
          <p className={commonStyles.errorMessage}>
            Desculpe, não conseguimos encontrar a loja que você está procurando.
          </p>
          <button 
            onClick={() => router.push('/')}
            className={`${heroStyles.btn} ${heroStyles.btnPrimary}`}
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={commonStyles.container}>
      
      {/* ========== HEADER SECTION ========== */}
      <HeaderSection storeData={storeData} />
      
      {/* ========== HERO SECTION ========== */}
      <HeroSection 
        storeData={storeData} 
        onWhatsAppClick={handleWhatsApp}
        onCallClick={handleCall}
      />
      
      {/* ========== BENEFITS SECTION ========== */}
      <BenefitsSection 
        storeData={storeData}
        onCTAClick={handleBenefitsCTAClick}
      />
      
      {/* ========== STORE INFO SECTION ========== */}
      {storeData.imagem_loja && (
        <StoreInfoSection 
          storeData={storeData}
          onMapClick={handleMap}
        />
      )}
      
      {/* ========== FOOTER SECTION ========== */}
      <FooterSection storeData={storeData} />
      
    </div>
  );
}

// ========== HEADER COMPONENT ==========
function HeaderSection({ storeData }) {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.headerContent}>
        <h1 className={headerStyles.headerTitle}>
          🔋 Rede Única de Baterias - {storeData.cidade}
        </h1>
        <p className={headerStyles.headerSubtitle}>
          Bateria Automotiva com Garantia de Fábrica
        </p>
      </div>
    </header>
  );
}

// ========== HERO COMPONENT ==========
function HeroSection({ storeData, onWhatsAppClick, onCallClick }) {
  return (
    <section className={`${commonStyles.section} ${commonStyles.sectionWhite}`}>
      <div className={commonStyles.sectionContent}>
        <div className={heroStyles.heroGrid}>
          
          {/* Hero Content */}
          <div className={heroStyles.heroContent}>
            <h2>
              Bateria Automotiva em {storeData.cidade}
              <br />
              com Garantia de Fábrica
            </h2>
            
            {/* Price Box */}
            {storeData.preco_inicial && (
              <div className={heroStyles.priceBox}>
                <div className={heroStyles.priceValue}>
                  A partir de R$ {formatPrice(storeData.preco_inicial) || storeData.preco_inicial}
                </div>
                <p className={heroStyles.priceNote}>
                  + Entrega e Instalação GRÁTIS
                </p>
                <p className={heroStyles.pricePayment}>
                  *À vista ou no cartão em até 12x
                </p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className={heroStyles.buttonsContainer}>
              <button 
                className={`${heroStyles.btn} ${heroStyles.btnWhatsapp}`}
                onClick={onWhatsAppClick}
                disabled={!storeData.link_whatsapp}
              >
                <span>💬</span>
                Pedir Bateria
              </button>
              
              {storeData.telefone && (
                <button 
                  className={`${heroStyles.btn} ${heroStyles.btnCall}`}
                  onClick={onCallClick}
                >
                  <span>📞</span>
                  Ligar Agora
                </button>
              )}
            </div>
          </div>
          
          {/* Hero Image */}
          <div className={heroStyles.heroImage}>
            {storeData.imagem_produto ? (
              <img 
                src={storeData.imagem_produto}
                alt={`Bateria Automotiva - ${storeData.cidade}`}
                className={heroStyles.productImage}
                loading="lazy"
              />
            ) : (
              <div className={heroStyles.placeholderImage}>
                <div className={heroStyles.placeholderIcon}>🔋</div>
                <p className={heroStyles.placeholderText}>Bateria Automotiva</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ========== BENEFITS COMPONENT ==========
function BenefitsSection({ storeData, onCTAClick }) {
  const benefits = defaultBenefits;

  return (
    <section className={`${commonStyles.section} ${commonStyles.sectionGray}`}>
      <div className={commonStyles.sectionContent}>
        <h2 className={commonStyles.sectionTitle}>
          Por que comprar com a Rede Única?
        </h2>
        
        {/* Benefits Grid */}
        <div className={benefitsStyles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={benefit.id} 
              benefit={benefit} 
              index={index}
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className={benefitsStyles.ctaSection}>
          <button 
            className={`${benefitsStyles.btn} ${benefitsStyles.btnWhatsapp}`}
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

// ========== BENEFIT CARD COMPONENT ==========
function BenefitCard({ benefit, index }) {
  return (
    <div 
      className={benefitsStyles.card} 
      data-benefit-card
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className={benefitsStyles.cardIcon}>
        {benefit.icon}
      </div>
      <h3 className={benefitsStyles.cardTitle}>
        {benefit.title}
      </h3>
      <p className={benefitsStyles.cardDescription}>
        {benefit.description}
      </p>
    </div>
  );
}

// ========== STORE INFO COMPONENT ==========
function StoreInfoSection({ storeData, onMapClick }) {
  return (
    <section className={`${commonStyles.section} ${commonStyles.sectionWhite}`}>
      <div className={commonStyles.sectionContent}>
        <h2 className={commonStyles.sectionTitle}>
          Veja como nos encontrar
        </h2>
        
        <div className={storeInfoStyles.storeInfoGrid}>
          
          {/* Store Image */}
          <div className={storeInfoStyles.storeImage}>
            <img 
              src={storeData.imagem_loja}
              alt={`Rede Única de Baterias - Loja de ${storeData.cidade}`}
              loading="lazy"
            />
          </div>
          
          {/* Store Info Card */}
          <div>
            <div className={storeInfoStyles.storeInfoCard}>
              <h3 className={`${storeInfoStyles.storeInfoTitle} storeInfoTitle`}>
                Rede Única de Baterias - {storeData.cidade}
              </h3>
              
              {/* Phone Info */}
              {storeData.telefone && (
                <StoreInfoItem 
                  label="Telefone:"
                  value={formatPhoneNumber(storeData.telefone)}
                  isPhone={true}
                />
              )}
              
              {/* Address Info */}
              <StoreInfoItem 
                label="Endereço:"
                value={`${storeData.cidade}, ${storeData.estado}`}
              />
              
              {/* Business Hours */}
              <StoreInfoItem 
                label="Horário de Funcionamento:"
                value={
                  <>
                    <p className={storeInfoStyles.storeInfoValue}>Segunda a Sexta: 8h às 18h</p>
                    <p className={storeInfoStyles.storeInfoValue}>Sábado: 8h às 12h</p>
                  </>
                }
                isMultiline={true}
              />
              
              {/* Map Button */}
              {storeData.link_maps && (
                <div className={storeInfoStyles.mapButton}>
                  <button 
                    className={`${storeInfoStyles.btn} ${storeInfoStyles.btnPrimary}`}
                    onClick={onMapClick}
                    data-action="map"
                  >
                    <span>📍</span>
                    Traçar Rota
                  </button>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ========== STORE INFO ITEM COMPONENT ==========
function StoreInfoItem({ label, value, isPhone, isMultiline }) {
  return (
    <div className={storeInfoStyles.storeInfoItem}>
      <p className={storeInfoStyles.storeInfoLabel}>{label}</p>
      {isMultiline ? (
        <div>{value}</div>
      ) : isPhone ? (
        <p className={storeInfoStyles.storeInfoValue} data-phone>
          <a href={`tel:+55${value.replace(/\D/g, '')}`} aria-label={`Ligar para ${value}`}>
            {value}
          </a>
        </p>
      ) : (
        <p className={storeInfoStyles.storeInfoValue}>{value}</p>
      )}
    </div>
  );
}

// ========== FOOTER COMPONENT ==========
function FooterSection({ storeData }) {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footerContent}>
        <p className={`${footerStyles.footerCopyright} footerCopyright`}>
          &copy; {new Date().getFullYear()} Rede Única de Baterias. Todos os direitos reservados.
        </p>
        <p className={footerStyles.footerTagline}>
          🔋 A maior rede de lojas de baterias automotivas do Brasil!
        </p>
        
        {/* Additional Footer Info */}
        {storeData.cidade && (
          <p className={footerStyles.footerLocation}>
            Atendendo {storeData.cidade} e região
          </p>
        )}
      </div>
    </footer>
  );
}