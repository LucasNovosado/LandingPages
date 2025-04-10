import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getStoreBySlug } from '../services/parseService';

// Hook para acessar os dados da loja atual
const useStore = (initialStoreData = null) => {
  const router = useRouter();
  const { slug } = router.query;
  const [storeData, setStoreData] = useState(initialStoreData);
  const [loading, setLoading] = useState(!initialStoreData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se já temos os dados ou não temos slug, não fazemos nada
    if (initialStoreData || !slug) {
      return;
    }

    const fetchStoreData = async () => {
      try {
        setLoading(true);
        const data = await getStoreBySlug(slug);
        
        if (!data) {
          setError('Loja não encontrada');
          // Redireciona para a página inicial se a loja não existir
          router.push('/');
          return;
        }
        
        setStoreData(data);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar dados da loja:', err);
        setError('Erro ao carregar os dados da loja');
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [slug, router, initialStoreData]);

  return {
    storeData,
    loading,
    error
  };
};

export default useStore;