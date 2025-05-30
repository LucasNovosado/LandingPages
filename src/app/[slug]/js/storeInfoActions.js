// Store Info Section Actions and Logic

/**
 * Handles map/route button click
 * @param {string} mapsLink - Google Maps link from store data
 * @param {string} cidade - City name for analytics
 */
export const handleMapClick = (mapsLink, cidade) => {
  if (mapsLink) {
    // Track analytics event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'maps_route',
        custom_parameters: {
          cidade: cidade
        }
      });
    }
    
    window.open(mapsLink, '_blank');
  } else {
    console.warn('Maps link not provided');
  }
};

/**
 * Formats phone number for display
 * @param {string} phone - Raw phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on Brazilian phone number patterns
  if (cleaned.length === 11) {
    // Mobile: (11) 99999-9999
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    // Landline: (11) 9999-9999
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone; // Return original if doesn't match expected patterns
};

/**
 * Generates store address string
 * @param {Object} storeData - Store data object
 * @returns {string} Complete address
 */
export const getStoreAddress = (storeData) => {
  const parts = [];
  
  if (storeData.endereco) parts.push(storeData.endereco);
  if (storeData.cidade) parts.push(storeData.cidade);
  if (storeData.estado) parts.push(storeData.estado);
  if (storeData.cep) parts.push(`CEP: ${storeData.cep}`);
  
  return parts.join(', ');
};

/**
 * Gets business hours based on current day
 * @param {Object} customHours - Custom business hours (optional)
 * @returns {Object} Current day status and hours
 */
export const getBusinessHours = (customHours = null) => {
  const defaultHours = {
    monday: { open: '08:00', close: '18:00', isOpen: true },
    tuesday: { open: '08:00', close: '18:00', isOpen: true },
    wednesday: { open: '08:00', close: '18:00', isOpen: true },
    thursday: { open: '08:00', close: '18:00', isOpen: true },
    friday: { open: '08:00', close: '18:00', isOpen: true },
    saturday: { open: '08:00', close: '12:00', isOpen: true },
    sunday: { open: '00:00', close: '00:00', isOpen: false }
  };
  
  const hours = customHours || defaultHours;
  const now = new Date();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = dayNames[now.getDay()];
  const currentTime = now.getHours() * 100 + now.getMinutes();
  
  const todayHours = hours[currentDay];
  const openTime = parseInt(todayHours.open.replace(':', ''));
  const closeTime = parseInt(todayHours.close.replace(':', ''));
  
  const isCurrentlyOpen = todayHours.isOpen && 
    currentTime >= openTime && 
    currentTime <= closeTime;
  
  return {
    currentDay,
    todayHours,
    isCurrentlyOpen,
    nextOpenDay: getNextOpenDay(hours, currentDay)
  };
};

/**
 * Gets the next day the store will be open
 * @param {Object} hours - Business hours object
 * @param {string} currentDay - Current day name
 * @returns {string} Next open day
 */
const getNextOpenDay = (hours, currentDay) => {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentIndex = dayNames.indexOf(currentDay);
  
  for (let i = 1; i < 7; i++) {
    const nextDayIndex = (currentIndex + i) % 7;
    const nextDay = dayNames[nextDayIndex];
    
    if (hours[nextDay].isOpen) {
      return nextDay;
    }
  }
  
  return 'monday'; // Fallback
};

/**
 * Validates store info data
 * @param {Object} storeData - Store data object
 * @returns {Object} Validation result
 */
export const validateStoreInfo = (storeData) => {
  const errors = [];
  const warnings = [];
  
  if (!storeData.cidade) {
    errors.push('Cidade é obrigatória');
  }
  
  if (!storeData.estado) {
    errors.push('Estado é obrigatório');
  }
  
  if (!storeData.telefone) {
    warnings.push('Telefone não fornecido');
  }
  
  if (!storeData.link_maps) {
    warnings.push('Link do Maps não fornecido');
  }
  
  if (!storeData.imagem_loja) {
    warnings.push('Imagem da loja não fornecida');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Lazy loads store image with error handling
 * @param {HTMLImageElement} img - Image element
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 */
export const loadStoreImage = (img, src, alt) => {
  img.alt = alt;
  
  const handleLoad = () => {
    img.classList.add('loaded');
  };
  
  const handleError = () => {
    img.src = '/images/store-placeholder.jpg'; // Fallback image
    img.alt = 'Imagem da loja não disponível';
    console.warn('Store image failed to load:', src);
  };
  
  img.addEventListener('load', handleLoad);
  img.addEventListener('error', handleError);
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = src;
          imageObserver.unobserve(entry.target);
        }
      });
    });
    
    imageObserver.observe(img);
  } else {
    img.src = src;
  }
};

/**
 * Initializes store info section
 * @param {Object} storeData - Store data object
 */
export const initStoreInfoSection = (storeData) => {
  // Add business hours indicator
  const businessHours = getBusinessHours(storeData.customHours);
  
  // Create status indicator element
  if (businessHours.isCurrentlyOpen) {
    addOpenStatusIndicator();
  } else {
    addClosedStatusIndicator(businessHours.nextOpenDay);
  }
  
  // Initialize phone number formatting
  formatPhoneNumbers();
  
  // Setup image lazy loading
  setupImageLazyLoading();
  
  // Add accessibility improvements
  addAccessibilityFeatures();
};

/**
 * Adds open status indicator
 */
const addOpenStatusIndicator = () => {
  const indicator = document.createElement('div');
  indicator.className = 'business-status open';
  indicator.innerHTML = `
    <span class="status-dot"></span>
    <span class="status-text">Aberto agora</span>
  `;
  
  // Add styles
  addStatusIndicatorStyles();
  
  const storeTitle = document.querySelector('.storeInfoTitle');
  if (storeTitle) {
    storeTitle.appendChild(indicator);
  }
};

/**
 * Adds closed status indicator
 * @param {string} nextOpenDay - Next day the store will be open
 */
const addClosedStatusIndicator = (nextOpenDay) => {
  const dayTranslations = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };
  
  const indicator = document.createElement('div');
  indicator.className = 'business-status closed';
  indicator.innerHTML = `
    <span class="status-dot"></span>
    <span class="status-text">Fechado - Abre ${dayTranslations[nextOpenDay]}</span>
  `;
  
  // Add styles
  addStatusIndicatorStyles();
  
  const storeTitle = document.querySelector('.storeInfoTitle');
  if (storeTitle) {
    storeTitle.appendChild(indicator);
  }
};

/**
 * Adds CSS styles for status indicators
 */
const addStatusIndicatorStyles = () => {
  if (document.querySelector('#status-indicator-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'status-indicator-styles';
  style.textContent = `
    .business-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
    }
    
    .business-status.open {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    
    .business-status.closed {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }
    
    .business-status.open .status-dot {
      background-color: #28a745;
      animation: pulse-green 2s infinite;
    }
    
    .business-status.closed .status-dot {
      background-color: #dc3545;
    }
    
    @keyframes pulse-green {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
};

/**
 * Formats all phone numbers on the page
 */
const formatPhoneNumbers = () => {
  const phoneElements = document.querySelectorAll('[data-phone]');
  
  phoneElements.forEach(element => {
    const rawPhone = element.textContent;
    const formattedPhone = formatPhoneNumber(rawPhone);
    if (formattedPhone !== rawPhone) {
      element.textContent = formattedPhone;
    }
  });
};

/**
 * Sets up lazy loading for store images
 */
const setupImageLazyLoading = () => {
  const storeImages = document.querySelectorAll('.storeImage img');
  
  storeImages.forEach(img => {
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    
    if (src && !img.hasAttribute('data-lazy-loaded')) {
      img.setAttribute('data-lazy-loaded', 'true');
      loadStoreImage(img, src, alt);
    }
  });
};

/**
 * Adds accessibility features to store info section
 */
const addAccessibilityFeatures = () => {
  // Add ARIA labels to buttons
  const mapButtons = document.querySelectorAll('[data-action="map"]');
  mapButtons.forEach(button => {
    if (!button.getAttribute('aria-label')) {
      button.setAttribute('aria-label', 'Abrir localização no Google Maps');
    }
  });
  
  // Add phone link accessibility
  const phoneElements = document.querySelectorAll('.storeInfoValue');
  phoneElements.forEach(element => {
    const text = element.textContent;
    if (text && text.match(/\(\d{2}\)\s\d{4,5}-\d{4}/)) {
      const phoneNumber = text.replace(/\D/g, '');
      const link = document.createElement('a');
      link.href = `tel:+55${phoneNumber}`;
      link.textContent = text;
      link.setAttribute('aria-label', `Ligar para ${text}`);
      element.innerHTML = '';
      element.appendChild(link);
    }
  });
  
  // Improve address accessibility
  const addressElements = document.querySelectorAll('.storeInfoValue');
  addressElements.forEach(element => {
    const previousLabel = element.previousElementSibling;
    if (previousLabel && previousLabel.textContent.includes('Endereço')) {
      element.setAttribute('aria-label', `Endereço da loja: ${element.textContent}`);
    }
  });
};

/**
 * Generates location schema markup
 * @param {Object} storeData - Store data object
 * @returns {Object} Schema.org LocalBusiness markup
 */
export const generateLocationSchema = (storeData) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Rede Única de Baterias - ${storeData.cidade}`,
    "description": "Loja especializada em baterias automotivas com garantia de fábrica",
    "image": storeData.imagem_loja,
    "telephone": storeData.telefone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": storeData.endereco || "",
      "addressLocality": storeData.cidade,
      "addressRegion": storeData.estado,
      "postalCode": storeData.cep || "",
      "addressCountry": "BR"
    },
    "geo": storeData.latitude && storeData.longitude ? {
      "@type": "GeoCoordinates",
      "latitude": storeData.latitude,
      "longitude": storeData.longitude
    } : undefined,
    "url": window.location.href,
    "priceRange": storeData.preco_inicial ? `A partir de R$ ${storeData.preco_inicial}` : "$$",
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 08:00-12:00"
    ],
    "paymentAccepted": "Cash, Credit Card",
    "currenciesAccepted": "BRL",
    "areaServed": {
      "@type": "City",
      "name": storeData.cidade
    }
  };
  
  // Remove undefined properties
  return JSON.parse(JSON.stringify(schema));
};

/**
 * Creates a shareable store info object
 * @param {Object} storeData - Store data object
 * @returns {Object} Shareable store info
 */
export const createShareableStoreInfo = (storeData) => {
  const businessHours = getBusinessHours(storeData.customHours);
  
  return {
    name: `Rede Única de Baterias - ${storeData.cidade}`,
    address: getStoreAddress(storeData),
    phone: formatPhoneNumber(storeData.telefone),
    isOpen: businessHours.isCurrentlyOpen,
    hours: 'Segunda a Sexta: 8h às 18h, Sábado: 8h às 12h',
    mapsLink: storeData.link_maps,
    whatsappLink: storeData.link_whatsapp,
    image: storeData.imagem_loja
  };
};

/**
 * Handles store info sharing
 * @param {Object} storeData - Store data object
 * @param {string} method - Sharing method ('whatsapp', 'copy', 'native')
 */
export const shareStoreInfo = async (storeData, method = 'native') => {
  const shareableInfo = createShareableStoreInfo(storeData);
  const shareText = `
🔋 ${shareableInfo.name}
📍 ${shareableInfo.address}
📞 ${shareableInfo.phone}
🕒 ${shareableInfo.hours}
${shareableInfo.isOpen ? '✅ Aberto agora' : '❌ Fechado'}

${window.location.href}
  `.trim();

  switch (method) {
    case 'whatsapp':
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
      break;
      
    case 'copy':
      try {
        await navigator.clipboard.writeText(shareText);
        showShareNotification('Informações copiadas para a área de transferência!');
      } catch (err) {
        console.error('Failed to copy:', err);
        fallbackCopyToClipboard(shareText);
      }
      break;
      
    case 'native':
    default:
      if (navigator.share) {
        try {
          await navigator.share({
            title: shareableInfo.name,
            text: shareText,
            url: window.location.href
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.error('Share failed:', err);
            shareStoreInfo(storeData, 'copy'); // Fallback to copy
          }
        }
      } else {
        shareStoreInfo(storeData, 'copy'); // Fallback to copy
      }
      break;
  }
  
  // Track analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'share', {
      method: method,
      content_type: 'store_info',
      item_id: storeData.cidade
    });
  }
};

/**
 * Fallback method to copy text to clipboard
 * @param {string} text - Text to copy
 */
const fallbackCopyToClipboard = (text) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showShareNotification('Informações copiadas!');
  } catch (err) {
    console.error('Fallback copy failed:', err);
    showShareNotification('Não foi possível copiar. Tente novamente.', 'error');
  }
  
  document.body.removeChild(textArea);
};

/**
 * Shows share notification to user
 * @param {string} message - Notification message
 * @param {string} type - Notification type ('success' or 'error')
 */
const showShareNotification = (message, type = 'success') => {
  const notification = document.createElement('div');
  notification.className = `share-notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-size: 0.9rem;
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    ${type === 'success' 
      ? 'background: #28a745; box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);' 
      : 'background: #dc3545; box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);'
    }
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
};