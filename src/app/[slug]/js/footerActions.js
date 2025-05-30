// Footer Section Actions and Logic

/**
 * Gets current year for copyright
 * @returns {number} Current year
 */
export const getCurrentYear = () => {
  return new Date().getFullYear();
};

/**
 * Initializes footer with dynamic content
 * @param {Object} storeData - Store data object
 */
export const initFooter = (storeData) => {
  updateCopyrightYear();
  addFooterAnalytics();
  
  // Add store-specific footer content if available
  if (storeData.footerCustomText) {
    addCustomFooterContent(storeData.footerCustomText);
  }
};

/**
 * Updates copyright year dynamically
 */
const updateCopyrightYear = () => {
  const copyrightElements = document.querySelectorAll('.footerCopyright');
  const currentYear = getCurrentYear();
  
  copyrightElements.forEach(element => {
    element.textContent = `© ${currentYear} Rede Única de Baterias. Todos os direitos reservados.`;
  });
};

/**
 * Adds analytics tracking to footer
 */
const addFooterAnalytics = () => {
  const footer = document.querySelector('.footer');
  
  if (footer && 'IntersectionObserver' in window) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Track footer view
          if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
              event_category: 'engagement',
              event_label: 'footer_reached'
            });
          }
          
          footerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });
    
    footerObserver.observe(footer);
  }
};

/**
 * Adds custom footer content
 * @param {string} customText - Custom footer text
 */
const addCustomFooterContent = (customText) => {
  const footerContent = document.querySelector('.footerContent');
  
  if (footerContent && customText) {
    const customElement = document.createElement('p');
    customElement.className = 'footerCustom';
    customElement.textContent = customText;
    customElement.style.cssText = `
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
      margin: 1rem 0 0 0;
      font-style: italic;
    `;
    
    footerContent.appendChild(customElement);
  }
};

/**
 * Generates footer schema markup for SEO
 * @param {Object} storeData - Store data object
 * @returns {Object} Schema.org Organization markup
 */
export const generateFooterSchema = (storeData) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": `Rede Única de Baterias - ${storeData.cidade}`,
    "description": "Bateria Automotiva com Garantia de Fábrica",
    "url": window.location.href,
    "logo": storeData.imagem_produto,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": storeData.cidade,
      "addressRegion": storeData.estado,
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": storeData.telefone,
      "contactType": "customer service",
      "availableLanguage": "Portuguese"
    },
    "sameAs": [
      storeData.link_whatsapp,
      storeData.link_maps
    ].filter(Boolean)
  };
  
  return schema;
};

/**
 * Injects schema markup into page head
 * @param {Object} schema - Schema.org markup object
 */
export const injectSchemaMarkup = (schema) => {
  const existingSchema = document.querySelector('script[type="application/ld+json"]');
  
  if (existingSchema) {
    existingSchema.remove();
  }
  
  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify(schema, null, 2);
  
  document.head.appendChild(schemaScript);
};

/**
 * Adds smooth scroll to top functionality
 */
export const addScrollToTop = () => {
  const scrollButton = document.createElement('button');
  scrollButton.className = 'scroll-to-top';
  scrollButton.innerHTML = '↑';
  scrollButton.setAttribute('aria-label', 'Voltar ao topo');
  
  // Add styles
  scrollButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(30, 60, 114, 0.4);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
  `;
  
  // Add hover effect
  scrollButton.addEventListener('mouseenter', () => {
    scrollButton.style.transform = 'translateY(-2px)';
    scrollButton.style.boxShadow = '0 6px 20px rgba(30, 60, 114, 0.6)';
  });
  
  scrollButton.addEventListener('mouseleave', () => {
    scrollButton.style.transform = 'translateY(0)';
    scrollButton.style.boxShadow = '0 4px 15px rgba(30, 60, 114, 0.4)';
  });
  
  // Add click functionality
  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Track analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'scroll_to_top'
      });
    }
  });
  
  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollButton.style.opacity = '1';
      scrollButton.style.visibility = 'visible';
    } else {
      scrollButton.style.opacity = '0';
      scrollButton.style.visibility = 'hidden';
    }
  });
  
  document.body.appendChild(scrollButton);
};

/**
 * Validates footer data
 * @param {Object} storeData - Store data object
 * @returns {Object} Validation result
 */
export const validateFooterData = (storeData) => {
  const warnings = [];
  
  if (!storeData.cidade) {
    warnings.push('Cidade não fornecida para o footer');
  }
  
  return {
    isValid: true, // Footer always renders with defaults
    warnings
  };
};