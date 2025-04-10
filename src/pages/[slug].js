import { useEffect } from 'react';
import { useRouter } from 'next/router';
import StoreLayout from '../components/layout/StoreLayout';
import HeroSection from '../components/sections/HeroSection';
import AlertSection from '../components/sections/AlertSection';
import BenefitsSection from '../components/sections/BenefitsSection';
import StoreInfoSection from '../components/sections/StoreInfoSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import Loader from '../components/ui/Loader';
import { initializeParse, getStoreBySlug, getAllStores } from '../services/parseService';
import useStore from '../hooks/useStore';
import useGTM from '../hooks/useGTM';
import styles from './[slug].module.css';

// Página dinâmica para cada loja
export default function StorePage({ initialStoreData }) {
  const router = useRouter();
  const { storeData, loading, error } = useStore(initialStoreData);
  const gtm = useGTM(storeData);
  
  // Inicializa o Parse no lado do cliente
  useEffect(() => {
    initializeParse();
  }, []);
  
  // Se estamos em fallback (página sendo gerada) ou carregando, mostra loader
  if (router.isFallback || loading) {
    return <Loader size="lg" />;
  }
  
  // Se ocorreu um erro ou não há dados da loja, mostra página de erro
  if (error || !storeData) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>Loja não encontrada</h1>
        <p className={styles.errorMessage}>Desculpe, não conseguimos encontrar a loja que você está procurando.</p>
        <button 
          onClick={() => router.push('/')}
          className={styles.backButton}
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }
  
  // Renderiza a página da loja com todos os componentes
  return (
    <StoreLayout storeData={storeData}>
      <HeroSection storeData={storeData} />
      <AlertSection />
      <BenefitsSection storeData={storeData} />
      <StoreInfoSection storeData={storeData} />
      <TestimonialsSection storeData={storeData} />
    </StoreLayout>
  );
}

// Esta função é executada em build time para gerar todas as rotas possíveis
export async function getStaticPaths() {
  // Inicializa o Parse Server
  initializeParse();
  
  // Busca todas as lojas para gerar os caminhos estáticos
  const stores = await getAllStores();
  
  const paths = stores.map((store) => ({
    params: { slug: store.slug },
  }));
  
  return { 
    paths, 
    fallback: 'blocking' // 'blocking' para gerar páginas sob demanda se não existirem no build
  };
}

// Esta função é executada em build time para cada caminho gerado por getStaticPaths
export async function getStaticProps({ params }) {
  // Inicializa o Parse Server
  initializeParse();
  
  try {
    // Busca os dados da loja pelo slug
    const storeData = await getStoreBySlug(params.slug);
    
    // Se não encontrar a loja, retorna 404
    if (!storeData) {
      return {
        notFound: true,
      };
    }
    
    // Retorna os dados da loja como props
    return {
      props: {
        initialStoreData: storeData,
      },
      // Revalidar a cada 1 hora (3600 segundos) - ISR (Incremental Static Regeneration)
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Erro ao buscar dados da loja:', error);
    return {
      notFound: true,
    };
  }
}