'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { initializeParse, getAllStores } from '../services/parseService';
import { getCurrentBrandConfig } from '../config/brand';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Obtém as configurações da marca atual
  const brandConfig = getCurrentBrandConfig();
  
  // Define as variáveis CSS para a marca atual
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--brand-primary', brandConfig.primaryColor);
      document.documentElement.style.setProperty('--brand-secondary', brandConfig.secondaryColor);
    }
  }, [brandConfig]);

  useEffect(() => {
    const loadStores = async () => {
      try {
        initializeParse();
        // A função getAllStores já filtra automaticamente pela marca configurada
        const storesData = await getAllStores();
        const sortedStores = storesData.sort((a, b) => 
          a.cidade > b.cidade ? 1 : a.cidade < b.cidade ? -1 : 0
        );
        
        console.log(`Carregadas ${storesData.length} lojas da marca: ${brandConfig.siteName}`);
        setStores(sortedStores);
      } catch (error) {
        console.error('Erro ao carregar lojas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStores();
  }, [brandConfig.siteName]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>
            {brandConfig.icon} {brandConfig.siteName}
          </h1>
          <p className={styles.headerSubtitle}>
            {brandConfig.tagline}
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.heroSection}>
          <h2 className={styles.heroTitle}>
            Baterias Automotivas com Garantia
          </h2>
          <p className={styles.heroDescription}>
            Encontre a bateria ideal para seu veículo em uma das lojas da {brandConfig.siteName}, 
            com entrega e instalação gratuitas.
          </p>
        </div>

        <div className={styles.storesSection}>
          <h2 className={styles.storesTitle}>
            🏪 Selecione a loja mais próxima de você
          </h2>
          
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loader}></div>
              <p className={styles.loadingText}>
                Carregando lojas da {brandConfig.siteName}...
              </p>
            </div>
          ) : stores && stores.length > 0 ? (
            <>
              <div className={styles.storeCount}>

              </div>
              <div className={styles.storesGrid}>
                {stores.map((store) => (
                  <Link
                    href={`/${store.slug}`}
                    key={store.slug}
                    className={styles.storeCard}
                  >
                    <div className={styles.storeIcon}>🌟</div>
                    <div className={styles.storeName}>{store.cidade}</div>
                    <div className={styles.storeState}>{store.estado}</div>
                    {store.preco_inicial && (
                      <div className={styles.storePrice}>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.loadingContainer}>
              <div className={styles.errorMessage}>
                <p>
                  ❌ Nenhuma loja encontrada para a marca <strong>"{brandConfig.siteName}"</strong>
                </p>
                <p className={styles.errorNote}>
                  Verifique se:
                </p>
                <ul className={styles.errorList}>
                  <li>A marca existe no banco de dados</li>
                  <li>O nome da marca em <code>src/config/brand.js</code> está correto</li>
                  <li>Existem lojas ativas vinculadas a esta marca</li>
                  <li>Sua conexão com o Parse Server está funcionando</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.benefitsSection}>
          <h2 className={styles.benefitsTitle}>
            ⚡ Por que escolher a {brandConfig.siteName}?
          </h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🛡️</div>
              <h3 className={styles.benefitTitle}>Garantia de Qualidade</h3>
              <p className={styles.benefitDescription}>
                Todas as nossas baterias possuem garantia de fábrica e certificação do INMETRO.
              </p>
            </div>
            
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>⚡</div>
              <h3 className={styles.benefitTitle}>Entrega Rápida</h3>
              <p className={styles.benefitDescription}>
                Entrega e instalação gratuitas em até 15km da loja mais próxima de você.
              </p>
            </div>
            
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>💰</div>
              <h3 className={styles.benefitTitle}>Melhores Preços</h3>
              <p className={styles.benefitDescription}>
                Oferecemos os melhores preços do mercado e diversas formas de pagamento.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.contactSection}>
          <div className={styles.contactCard}>
            <h3 className={styles.contactTitle}>📱 Entre em contato</h3>
            <p className={styles.contactDescription}>
              Precisa de ajuda para encontrar a bateria ideal? Nossos especialistas da {brandConfig.siteName} estão prontos para te atender!
            </p>
            <button className={styles.whatsappButton}>
              💬 Falar no WhatsApp
            </button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} {brandConfig.siteName}. Todos os direitos reservados.
          </p>
          <p className={styles.footerTagline}>
            {brandConfig.icon} {brandConfig.tagline}
          </p>
          
          {/* Links das redes sociais */}
          <div className={styles.socialLinks}>
            <a 
              href={brandConfig.socialMedia.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              Facebook
            </a>
            <a 
              href={brandConfig.socialMedia.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}