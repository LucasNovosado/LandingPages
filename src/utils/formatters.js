// Formata o valor para exibição como preço em Reais
export const formatCurrency = (value) => {
    if (value === undefined || value === null) return 'R$ 0,00';
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  // Formata um número de telefone para exibição
  export const formatPhone = (phone) => {
    if (!phone) return '';
    
    // Remove caracteres não numéricos
    const numbers = phone.replace(/\D/g, '');
    
    // Formata de acordo com o padrão brasileiro
    if (numbers.length === 11) {
      // Celular com DDD
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7)}`;
    } else if (numbers.length === 10) {
      // Telefone fixo com DDD
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 6)}-${numbers.substring(6)}`;
    } else if (numbers.length === 9) {
      // Celular sem DDD
      return `${numbers.substring(0, 5)}-${numbers.substring(5)}`;
    } else if (numbers.length === 8) {
      // Telefone fixo sem DDD
      return `${numbers.substring(0, 4)}-${numbers.substring(4)}`;
    }
    
    // Se não se encaixar em nenhum formato conhecido, retorna como está
    return phone;
  };
  
  // Extrai o número do WhatsApp a partir do link
  export const extractWhatsAppNumber = (whatsappLink) => {
    if (!whatsappLink) return '';
    
    // Tenta encontrar o número no link do WhatsApp
    const match = whatsappLink.match(/(?:https?:\/\/)?(?:www\.)?wa\.me\/(\d+)/i) ||
                  whatsappLink.match(/(?:https?:\/\/)?(?:www\.)?api\.whatsapp\.com\/send\?phone=(\d+)/i);
    
    if (match && match[1]) {
      return match[1];
    }
    
    return '';
  };
  
  // Formata o slug para exibição amigável (primeira letra maiúscula)
  export const formatSlug = (slug) => {
    if (!slug) return '';
    
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  };
  
  export default {
    formatCurrency,
    formatPhone,
    extractWhatsAppNumber,
    formatSlug
  };