// Benefits Section Data and Logic

/**
 * Default benefits data
 */
export const defaultBenefits = [
  {
    id: 'quality',
    icon: '🛡️',
    title: 'Produtos de Qualidade',
    description: 'Oferecemos produtos direto da fábrica verificado pelo INMETRO.',
    order: 1
  },
  {
    id: 'price',
    icon: '💰',
    title: 'Melhores Preços',
    description: 'Produtos de qualidade e com preço diferenciado.',
    order: 2
  },
  {
    id: 'delivery',
    icon: '⚡',
    title: 'Entrega e instalação Gratuita',
    description: 'Sua bateria entregue e instalada até 15km da loja.',
    order: 3
  }
];

/**
 * Handles CTA button click in benefits section
 * @param {string} whatsappLink - WhatsApp link
 * @param {string} cidade - City name for analytics
 */
export const handleBenefitsCTA = (whatsappLink, cidade) => {
  if (whatsappLink) {
    // Track analytics event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'whatsapp_benefits',
        custom_parameters: {
          cidade: cidade
        }
      });
    }
    
    // Generate specific message for benefits section
    const message = `Olá! Vi os benefícios da Rede Única em ${cidade} e gostaria de fazer um pedido. Podem me ajudar?`;
    const encodedMessage = encodeURIComponent(message);
    
    // Extract phone number and create URL with message
    const whatsappRegex = /whatsapp\.com\/send\?phone=(\d+)/;
    const match = whatsappLink.match(whatsappRegex);
    
    let finalUrl = whatsappLink;
    if (match) {
      finalUrl = `https://wa.me/${match[1]}?text=${encodedMessage}`;
    }
    
    window.open(finalUrl, '_blank');
  }
};

/**
 * Animates benefits cards on scroll
 */
export const animateBenefitsOnScroll = () => {
  if ('IntersectionObserver' in window) {
    const benefitCards = document.querySelectorAll('[data-benefit-card]');
    
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 200); // Stagger animation
          
          cardObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    benefitCards.forEach(card => {
      cardObserver.observe(card);
    });
  }
};

/**
 * Validates benefits data structure
 * @param {Array} benefits - Benefits array
 * @returns {Object} Validation result
 */
export const validateBenefits = (benefits) => {
  const errors = [];
  
  if (!Array.isArray(benefits)) {
    errors.push('Benefits deve ser um array');
    return { isValid: false, errors };
  }
  
  benefits.forEach((benefit, index) => {
    if (!benefit.id) {
      errors.push(`Benefit ${index}: ID é obrigatório`);
    }
    
    if (!benefit.title) {
      errors.push(`Benefit ${index}: Título é obrigatório`);
    }
    
    if (!benefit.description) {
      errors.push(`Benefit ${index}: Descrição é obrigatória`);
    }
    
    if (!benefit.icon) {
      errors.push(`Benefit ${index}: Ícone é obrigatório`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sorts benefits by order property
 * @param {Array} benefits - Benefits array
 * @returns {Array} Sorted benefits
 */
export const sortBenefits = (benefits) => {
  return [...benefits].sort((a, b) => {
    const orderA = a.order || 999;
    const orderB = b.order || 999;
    return orderA - orderB;
  });
};

/**
 * Gets custom benefits or falls back to default
 * @param {Object} storeData - Store data object
 * @returns {Array} Benefits array
 */
export const getBenefits = (storeData) => {
  if (storeData.customBenefits && Array.isArray(storeData.customBenefits)) {
    const validation = validateBenefits(storeData.customBenefits);
    if (validation.isValid) {
      return sortBenefits(storeData.customBenefits);
    } else {
      console.warn('Custom benefits validation failed, using defaults:', validation.errors);
    }
  }
  
  return defaultBenefits;
};

/**
 * Initializes benefits section
 */
export const initBenefitsSection = () => {
  // Add CSS classes for animation
  const style = document.createElement('style');
  style.textContent = `
    [data-benefit-card] {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    [data-benefit-card].animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  // Initialize scroll animation
  animateBenefitsOnScroll();
};