'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { initializeParse, getAllStores } from '../services/parseService';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStores = async () => {
      try {
        initializeParse();
        const storesData = await getAllStores();
        const sortedStores = storesData.sort((a, b) => 
          a.cidade > b.cidade ? 1 : a.cidade < b.cidade ? -1 : 0
        );
        setStores(sortedStores);
      } catch (error) {
        console.error('Erro ao carregar lojas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStores();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>
            🔋 Rede Única de Baterias
          </h1>
          <p className={styles.headerSubtitle}>
            A maior rede de baterias automotivas do Brasil
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.heroSection}>
          <h2 className={styles.heroTitle}>
            Baterias Automotivas com Garantia
          </h2>
          <p className={styles.heroDescription}>
            Encontre a bateria ideal para seu veículo em uma das lojas da Rede Única de Baterias, 
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
                Carregando lojas disponíveis...
              </p>
            </div>
          ) : stores && stores.length > 0 ? (
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
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.loadingContainer}>
              <p className={styles.errorMessage}>
                Nenhuma loja encontrada. Verifique sua configuração do Parse Server.
              </p>
              <p className={styles.errorNote}>
                Configure seu arquivo .env.local com as credenciais corretas
              </p>
            </div>
          )}
        </div>
        
        <div className={styles.benefitsSection}>
          <h2 className={styles.benefitsTitle}>
            ⚡ Por que escolher a Rede Única?
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
              Precisa de ajuda para encontrar a bateria ideal? Nossos especialistas estão prontos para te atender!
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