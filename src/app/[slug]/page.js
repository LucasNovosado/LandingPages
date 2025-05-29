'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { initializeParse, getStoreBySlug } from '../../services/parseService';
import styles from '../StorePage.module.css';

export default function StorePage() {
  const params = useParams();
  const router = useRouter();
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleWhatsAppClick = () => {
    if (storeData?.link_whatsapp) {
      window.open(storeData.link_whatsapp, '_blank');
    }
  };

  const handleCallClick = () => {
    if (storeData?.telefone) {
      window.open(`tel:${storeData.telefone}`, '_self');
    }
  };

  const handleMapClick = () => {
    if (storeData?.link_maps) {
      window.open(storeData.link_maps, '_blank');
    }
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (error || !storeData) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <h1 className={styles.errorTitle}>Loja não encontrada</h1>
          <p className={styles.errorMessage}>
            Desculpe, não conseguimos encontrar a loja que você está procurando.
          </p>
          <button 
            onClick={() => router.push('/')}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>
            🔋 Rede Única de Baterias - {storeData.cidade}
          </h1>
          <p className={styles.headerSubtitle}>
            Bateria Automotiva com Garantia de Fábrica
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className={styles.sectionContent}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h2>
                Bateria Automotiva em {storeData.cidade}
                <br />
                com Garantia de Fábrica
              </h2>
              
              {storeData.preco_inicial && (
                <div className={styles.priceBox}>
                  <div className={styles.priceValue}>
                    A partir de R$ {storeData.preco_inicial}
                  </div>
                  <p className={styles.priceNote}>
                    + Entrega e Instalação GRÁTIS
                  </p>
                  <p className={styles.pricePayment}>
                    *À vista ou no cartão em até 12x
                  </p>
                </div>
              )}
              
              <div className={styles.buttonsContainer}>
                <button 
                  className={`${styles.btn} ${styles.btnWhatsapp}`}
                  onClick={handleWhatsAppClick}
                >
                  <span>💬</span>
                  Pedir Bateria
                </button>
                
                {storeData.telefone && (
                  <button 
                    className={`${styles.btn} ${styles.btnCall}`}
                    onClick={handleCallClick}
                  >
                    <span>📞</span>
                    Ligar Agora
                  </button>
                )}
              </div>
            </div>
            
            <div className={styles.heroImage}>
              {storeData.imagem_produto ? (
                <img 
                  src={storeData.imagem_produto}
                  alt={`Bateria Automotiva - ${storeData.cidade}`}
                  className={styles.productImage}
                />
              ) : (
                <div className={styles.placeholderImage}>
                  <div className={styles.placeholderIcon}>🔋</div>
                  <p className={styles.placeholderText}>Bateria Automotiva</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className={`${styles.section} ${styles.sectionGray}`}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>
            Por que comprar com a Rede Única?
          </h2>
          
          <div className={styles.benefitsGrid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🛡️</div>
              <h3 className={styles.cardTitle}>Produtos de Qualidade</h3>
              <p className={styles.cardDescription}>
                Oferecemos produtos direto da fábrica verificado pelo INMETRO.
              </p>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardIcon}>💰</div>
              <h3 className={styles.cardTitle}>Melhores Preços</h3>
              <p className={styles.cardDescription}>
                Produtos de qualidade e com preço diferenciado.
              </p>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardIcon}>⚡</div>
              <h3 className={styles.cardTitle}>Entrega e instalação Gratuita</h3>
              <p className={styles.cardDescription}>
                Sua bateria entregue e instalada até 15km da loja.
              </p>
            </div>
          </div>
          
          <div className={styles.ctaSection}>
            <button 
              className={`${styles.btn} ${styles.btnWhatsapp}`}
              onClick={handleWhatsAppClick}
            >
              <span>💬</span>
              Pedir Bateria Agora
            </button>
          </div>
        </div>
      </section>

      {/* Informações da Loja */}
      {storeData.imagem_loja && (
        <section className={`${styles.section} ${styles.sectionWhite}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>
              Veja como nos encontrar
            </h2>
            
            <div className={styles.storeInfoGrid}>
              <div className={styles.storeImage}>
                <img 
                  src={storeData.imagem_loja}
                  alt={`Rede Única de Baterias - Loja de ${storeData.cidade}`}
                />
              </div>
              
              <div>
                <div className={styles.storeInfoCard}>
                  <h3 className={styles.storeInfoTitle}>
                    Rede Única de Baterias - {storeData.cidade}
                  </h3>
                  
                  {storeData.telefone && (
                    <div className={styles.storeInfoItem}>
                      <p className={styles.storeInfoLabel}>Telefone:</p>
                      <p className={styles.storeInfoValue}>{storeData.telefone}</p>
                    </div>
                  )}
                  
                  <div className={styles.storeInfoItem}>
                    <p className={styles.storeInfoLabel}>Endereço:</p>
                    <p className={styles.storeInfoValue}>
                      {storeData.cidade}, {storeData.estado}
                    </p>
                  </div>
                  
                  <div className={styles.storeInfoItem}>
                    <p className={styles.storeInfoLabel}>Horário de Funcionamento:</p>
                    <p className={styles.storeInfoValue}>Segunda a Sexta: 8h às 18h</p>
                    <p className={styles.storeInfoValue}>Sábado: 8h às 12h</p>
                  </div>
                  
                  {storeData.link_maps && (
                    <div className={styles.mapButton}>
                      <button 
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        onClick={handleMapClick}
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
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} Rede Única de Baterias. Todos os direitos reservados.
          </p>
          <p className={styles.footerTagline}>
            🔋 A maior rede de lojas de baterias automotivas do Brasil!
          </p>
        </div>
      </footer>
    </div>
  );
}