'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { initializeParse, getStoreBySlug } from '../../services/parseService';

// Import components
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Benefits from './components/Benefits/Benefits';
import StoreInfo from './components/StoreInfo/StoreInfo';
import Footer from './components/Footer/Footer';
import ElevatedButton from './components/ElevatedButton/ElevatedButton';

// Import common styles
import commonStyles from './components/Common.module.css';

// Import controllers
import { pageController } from './js/pageController.js';
import { 
  handleWhatsAppClick, 
  handleCallClick 
} from './js/heroActions.js';
import { handleBenefitsCTA } from './js/benefitsData.js';
import { handleMapClick } from './js/storeInfoActions.js';

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
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#1e3c72',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={commonStyles.container}>
            
      {/* Hero Section */}
      <Hero 
        storeData={storeData} 
        onWhatsAppClick={handleWhatsApp}
        onCallClick={handleCall}
      />
      
      {/* Benefits Section */}
      <Benefits 
        storeData={storeData}
        onCTAClick={handleBenefitsCTAClick}
      />
      
      {/* Store Info Section - Only if has store image */}
      {storeData.imagem_loja && (
        <StoreInfo 
          storeData={storeData}
          onMapClick={handleMap}
        />
      )}
      
      {/* Footer Section */}
      <Footer storeData={storeData} />
      
      {/* Elevated WhatsApp Button - Flutuante */}
      <ElevatedButton 
        onClick={handleWhatsApp}
        storeData={storeData}
      />
    </div>
  );
}