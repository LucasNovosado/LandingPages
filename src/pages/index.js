import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { initializeParse, getAllStores } from '../services/parseService';
import styles from './index.module.css';

export default function Home({ stores = [] }) {
  const [loading, setLoading] = useState(stores.length === 0);
  const [localStores, setLocalStores] = useState(stores);
  
  // Inicializa o Parse no lado do cliente e busca lojas se necessário
  useEffect(() => {
    initializeParse();
    
    if (stores.length === 0) {
      const fetchStores = async () => {
        try {
          const fetchedStores = await getAllStores();
          const sortedStores = fetchedStores.sort((a, b) => 
            a.cidade > b.cidade ? 1 : a.cidade < b.cidade ? -1 : 0
          );
          setLocalStores(sortedStores);
        } catch (error) {
          console.error('Erro ao buscar lojas:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchStores();
    }
  }, [stores]);

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Rede Única de Baterias - A maior rede de baterias automotivas do Brasil</title>
        <meta name="description" content="Encontre as melhores baterias automotivas com garantia de fábrica. Entrega e instalação grátis. Presentes em mais de 50 cidades." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <img 
            src="/logo.png" 
            alt="Rede Única de Baterias" 
            className={styles.logo}
          />
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Baterias Automotivas com Garantia
          </h1>
          <p className={styles.heroDescription}>
            Encontre a bateria ideal para seu veículo em uma das lojas da Rede Única de Baterias, 
            a maior rede de baterias automotivas do Brasil.
          </p>
        </div>

        <div className={styles.storeLocatorCard}>
          <h2 className={styles.cardTitle}>
            Selecione a loja mais próxima de você
          </h2>
          
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p className={styles.loadingText}>Carregando lojas disponíveis...</p>
            </div>
          ) : localStores.length > 0 ? (
            <div className={styles.storeGrid}>
              {localStores.map((store) => (
                <Link
                  href={`/${store.slug}`}
                  key={store.slug}
                  className={styles.storeItem}
                >
                  <div className={styles.storeIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className={styles.storeInfo}>
                    <div className={styles.storeName}>
                      {store.cidade}
                    </div>
                    <div className={styles.storeLocation}>
                      {store.estado}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.errorMessage}>
              <p>Nenhuma loja encontrada. Por favor, tente novamente mais tarde.</p>
            </div>
          )}
        </div>
        
        <div className={styles.featuresSection}>
          <h2 className={styles.featuresTitle}>
            Por que escolher a Rede Única de Baterias?
          </h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Garantia de Qualidade</h3>
              <p className={styles.featureDescription}>
                Todas as nossas baterias possuem garantia de fábrica e certificação do INMETRO.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Entrega Rápida</h3>
              <p className={styles.featureDescription}>
                Entrega e instalação gratuitas em até 15km da loja mais próxima de você.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Melhores Preços</h3>
              <p className={styles.featureDescription}>
                Oferecemos os melhores preços do mercado e diversas formas de pagamento.
              </p>
            </div>
          </div>
        </div>
        
        <div className={styles.calloutSection}>
          <h3 className={styles.calloutTitle}>Atendimento em Todo Brasil</h3>
          <p className={styles.calloutDescription}>
            Precisando de uma bateria automotiva? A Rede Única de Baterias está presente em mais de 50 cidades.
          </p>
          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>
              <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Entrega rápida</span>
            </div>
            <div className={styles.benefitItem}>
              <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Garantia de fábrica</span>
            </div>
            <div className={styles.benefitItem}>
              <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Atendimento imediato</span>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            <div>
              <h3 className={styles.footerHeading}>Rede Única de Baterias</h3>
              <p>A maior rede de lojas de baterias automotivas do Brasil!</p>
            </div>
            <div>
              <h3 className={styles.footerHeading}>Horário de Atendimento</h3>
              <p>Segunda a Sexta: 08h às 18h</p>
              <p>Sábado: 08h às 12h</p>
            </div>
            <div>
              <h3 className={styles.footerHeading}>Contato</h3>
              <p>Central de Atendimento: (43) 3321-6398</p>
              <p>Email: contato@unicabaterias.com.br</p>
            </div>
          </div>
          <div className={styles.footerDivider}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Rede Única de Baterias. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  // Inicializa o Parse
  initializeParse();
  
  try {
    // Busca todas as lojas para exibir na página inicial
    const storesData = await getAllStores();
    
    // Se não encontrar lojas, retorna array vazio
    if (!storesData || storesData.length === 0) {
      return {
        props: {
          stores: [],
        },
        revalidate: 60, // Revalidar a cada 1 minuto
      };
    }
    
    // Organiza as lojas em ordem alfabética
    const sortedStores = storesData.sort((a, b) => 
      a.cidade > b.cidade ? 1 : a.cidade < b.cidade ? -1 : 0
    );
    
    return {
      props: {
        stores: sortedStores,
      },
      revalidate: 3600, // Revalidar a cada 1 hora
    };
  } catch (error) {
    console.error('Erro ao buscar lojas:', error);
    return {
      props: {
        stores: [],
      },
      revalidate: 60, // Tentar novamente em 1 minuto em caso de erro
    };
  }
}