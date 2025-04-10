// Inicialização do Google Tag Manager
export const initGTM = () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
    }
  };
  
  // Envio de eventos para o GTM
  export const pushEvent = (eventName, eventData = {}) => {
    if (typeof window !== 'undefined') {
      window.dataLayer.push({
        event: eventName,
        ...eventData
      });
      console.log(`Evento GTM enviado: ${eventName}`, eventData);
    }
  };
  
  // Evento de visualização de loja
  export const logStoreView = (storeData) => {
    pushEvent('store_view', {
      cidade: storeData.cidade,
      estado: storeData.estado
    });
  };
  
  // Evento de clique no WhatsApp
  export const logWhatsAppClick = (storeData) => {
    pushEvent('whatsapp_click', {
      cidade: storeData.cidade,
      telefone: storeData.telefone
    });
  };
  
  // Evento de clique no botão Ligar
  export const logCallClick = (storeData) => {
    pushEvent('call_click', {
      cidade: storeData.cidade,
      telefone: storeData.telefone
    });
  };
  
  // Evento de envio de formulário do WhatsApp
  export const logWhatsAppFormSubmit = (storeData, formData) => {
    pushEvent('whatsapp_form_submit', {
      cidade: storeData.cidade,
      telefone: storeData.telefone,
      numero_cliente: formData.numero
    });
  };
  
  // Evento de clique em "Traçar Rota"
  export const logMapRouteClick = (storeData) => {
    pushEvent('map_route_click', {
      cidade: storeData.cidade
    });
  };
  
  export default {
    initGTM,
    pushEvent,
    logStoreView,
    logWhatsAppClick,
    logCallClick,
    logWhatsAppFormSubmit,
    logMapRouteClick
  };