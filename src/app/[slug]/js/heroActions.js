// Hero Section Actions and Logic

/**
 * Handles WhatsApp click action
 * @param {string} whatsappLink - The WhatsApp link from store data
 */
export const handleWhatsAppClick = (whatsappLink) => {
  if (whatsappLink) {
    // Track analytics event (optional)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'whatsapp_hero'
      });
    }
    
    window.open(whatsappLink, '_blank');
  } else {
    console.warn('WhatsApp link not provided');
  }
};

/**
 * Handles phone call click action
 * @param {string} phoneNumber - The phone number from store data
 */
export const handleCallClick = (phoneNumber) => {
  if (phoneNumber) {
    // Track analytics event (optional)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'phone_call_hero'
      });
    }
    
    window.open(`tel:${phoneNumber}`, '_self');
  } else {
    console.warn('Phone number not provided');
  }
};

/**
 * Formats price value for display
 * @param {number|string} price - The price value
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (!price) return '';
  
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericPrice);
};

/**
 * Validates store data for hero section
 * @param {Object} storeData - Store data object
 * @returns {Object} Validation result
 */
export const validateHeroData = (storeData) => {
  const errors = [];
  const warnings = [];
  
  if (!storeData.cidade) {
    errors.push('Cidade é obrigatória');
  }
  
  if (!storeData.link_whatsapp) {
    warnings.push('Link do WhatsApp não fornecido');
  }
  
  if (!storeData.preco_inicial) {
    warnings.push('Preço inicial não fornecido');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Generates WhatsApp message template
 * @param {Object} storeData - Store data object
 * @returns {string} WhatsApp message URL with pre-filled text
 */
export const generateWhatsAppMessage = (storeData) => {
  const message = `Olá! Gostaria de saber mais sobre baterias automotivas em ${storeData.cidade}. Podem me ajudar?`;
  const encodedMessage = encodeURIComponent(message);
  
  // Extract phone number from WhatsApp link if it exists
  const whatsappRegex = /whatsapp\.com\/send\?phone=(\d+)/;
  const match = storeData.link_whatsapp?.match(whatsappRegex);
  
  if (match) {
    return `https://wa.me/${match[1]}?text=${encodedMessage}`;
  }
  
  return storeData.link_whatsapp;
};

/**
 * Lazy load product image with placeholder
 * @param {HTMLImageElement} img - Image element
 * @param {string} src - Image source URL
 */
export const lazyLoadImage = (img, src) => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = src;
          lazyImage.classList.remove('lazy');
          imageObserver.unobserve(lazyImage);
        }
      });
    });
    
    imageObserver.observe(img);
  } else {
    // Fallback for browsers without IntersectionObserver
    img.src = src;
  }
};