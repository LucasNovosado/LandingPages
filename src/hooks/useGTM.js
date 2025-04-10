import { useEffect } from 'react';
import { useRouter } from 'next/router';
import gtmService from '../services/gtmService';

// Hook para integração com o Google Tag Manager
export const useGTM = (storeData) => {
  const router = useRouter();

  // Inicializa o GTM quando o componente é montado
  useEffect(() => {
    gtmService.initGTM();
  }, []);

  // Registra a visualização da página quando os dados da loja são carregados
  useEffect(() => {
    if (storeData) {
      gtmService.logStoreView(storeData);
    }
  }, [storeData]);

  // Funções para registrar eventos
  const logWhatsAppClick = () => {
    if (storeData) {
      gtmService.logWhatsAppClick(storeData);
    }
  };

  const logCallClick = () => {
    if (storeData) {
      gtmService.logCallClick(storeData);
    }
  };

  const logWhatsAppFormSubmit = (formData) => {
    if (storeData) {
      gtmService.logWhatsAppFormSubmit(storeData, formData);
    }
  };

  const logMapRouteClick = () => {
    if (storeData) {
      gtmService.logMapRouteClick(storeData);
    }
  };

  return {
    logWhatsAppClick,
    logCallClick,
    logWhatsAppFormSubmit,
    logMapRouteClick
  };
};

export default useGTM;