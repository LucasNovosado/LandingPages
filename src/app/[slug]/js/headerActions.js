// Header Section Actions and Logic

/**
 * Generates dynamic header title
 * @param {Object} storeData - Store data object
 * @returns {string} Header title
 */
export const generateHeaderTitle = (storeData) => {
  const baseTitle = '🔋 Rede Única de Baterias';
  
  if (storeData.cidade) {
    return `${baseTitle} - ${storeData.cidade}`;
  }
  
  return baseTitle;
};

/**
 * Generates header subtitle based on store data
 * @param {Object} storeData - Store data object
 * @returns {string} Header subtitle
 */
export const generateHeaderSubtitle = (storeData) => {
  const defaultSubtitle = 'Bateria Automotiva com Garantia de Fábrica';
  
  if (storeData.customSubtitle) {
    return storeData.customSubtitle;
  }
  
  if (storeData.cidade) {
    return `${defaultSubtitle} em ${storeData.cidade}`;
  }
  
  return defaultSubtitle;
};

/**
 * Adds header scroll effect
 */
export const addHeaderScrollEffect = () => {
  const header = document.querySelector('.header');
  
  if (!header) return;
  
  let lastScrollY = window.scrollY;
  let headerHeight = header.offsetHeight;
  
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Add shadow when scrolled
    if (currentScrollY > 10) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Hide header when scrolling down, show when scrolling up
    if (Math.abs(currentScrollY - lastScrollY) > 10) {
      if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
        // Scrolling down
        header.style.transform = `translateY(-${headerHeight}px)`;
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
      lastScrollY = currentScrollY;
    }
  };
  
  // Throttle scroll event
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', throttledScroll);
  
  // Add transition for smooth animation
  header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  header.style.position = 'sticky';
  header.style.top = '0';
  header.style.zIndex = '100';
};

/**
 * Adds breadcrumb navigation to header
 * @param {Object} storeData - Store data object
 */
export const addBreadcrumb = (storeData) => {
  const header = document.querySelector('.headerContent');
  
  if (!header) return;
  
  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'breadcrumb';
  breadcrumb.setAttribute('aria-label', 'Navegação');
  
  const breadcrumbList = document.createElement('ol');
  breadcrumbList.style.cssText = `
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0;
    font-size: 0.9rem;
    opacity: 0.8;
  `;
  
  // Home item
  const homeItem = document.createElement('li');
  homeItem.innerHTML = `
    <a href="/" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">
      🏠 Início
    </a>
  `;
  breadcrumbList.appendChild(homeItem);
  
  // Separator
  const separator1 = document.createElement('li');
  separator1.innerHTML = '<span style="margin: 0 0.5rem; color: rgba(255, 255, 255, 0.6);">›</span>';
  breadcrumbList.appendChild(separator1);
  
  // Current page
  const currentItem = document.createElement('li');
  currentItem.innerHTML = `<span style="color: white; font-weight: 500;">${storeData.cidade || 'Loja'}</span>`;
  currentItem.setAttribute('aria-current', 'page');
  breadcrumbList.appendChild(currentItem);
  
  breadcrumb.appendChild(breadcrumbList);
  header.insertBefore(breadcrumb, header.firstChild);
};

/**
 * Generates structured data for header
 * @param {Object} storeData - Store data object
 * @returns {Object} BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (storeData) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Rede Única de Baterias",
        "item": window.location.origin
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": storeData.cidade || "Loja",
        "item": window.location.href
      }
    ]
  };
};

/**
 * Updates page title based on store data
 * @param {Object} storeData - Store data object
 */
export const updatePageTitle = (storeData) => {
  const baseTitle = 'Rede Única de Baterias';
  let pageTitle = baseTitle;
  
  if (storeData.cidade) {
    pageTitle = `${baseTitle} - ${storeData.cidade} | Bateria Automotiva com Garantia`;
  }
  
  document.title = pageTitle;
};

/**
 * Updates meta tags based on store data
 * @param {Object} storeData - Store data object
 */
export const updateMetaTags = (storeData) => {
  const description = `Bateria automotiva com garantia de fábrica em ${storeData.cidade || 'sua cidade'}. Entrega e instalação gratuita. Preços a partir de R$ ${storeData.preco_inicial || '150'}. Ligue agora!`;
  
  const keywords = `bateria automotiva, ${storeData.cidade}, garantia fábrica, entrega gratuita, instalação gratuita, preço baixo`;
  
  // Update or create meta tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);
  updateMetaTag('author', 'Rede Única de Baterias');
  
  // Open Graph tags
  updateMetaTag('og:title', document.title, 'property');
  updateMetaTag('og:description', description, 'property');
  updateMetaTag('og:type', 'website', 'property');
  updateMetaTag('og:url', window.location.href, 'property');
  
  if (storeData.imagem_produto) {
    updateMetaTag('og:image', storeData.imagem_produto, 'property');
  }
  
  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', document.title, 'name');
  updateMetaTag('twitter:description', description, 'name');
  
  if (storeData.imagem_produto) {
    updateMetaTag('twitter:image', storeData.imagem_produto, 'name');
  }
};

/**
 * Helper function to update or create meta tags
 * @param {string} name - Meta tag name/property
 * @param {string} content - Meta tag content
 * @param {string} attribute - Attribute type ('name' or 'property')
 */
const updateMetaTag = (name, content, attribute = 'name') => {
  let metaTag = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attribute, name);
    document.head.appendChild(metaTag);
  }
  
  metaTag.setAttribute('content', content);
};

/**
 * Validates header data
 * @param {Object} storeData - Store data object
 * @returns {Object} Validation result
 */
export const validateHeaderData = (storeData) => {
  const warnings = [];
  
  if (!storeData.cidade) {
    warnings.push('Cidade não fornecida - usando título genérico');
  }
  
  if (!storeData.preco_inicial) {
    warnings.push('Preço inicial não fornecido - pode afetar SEO');
  }
  
  return {
    isValid: true, // Header always renders
    warnings
  };
};

/**
 * Initializes header functionality
 * @param {Object} storeData - Store data object
 */
export const initHeader = (storeData) => {
  updatePageTitle(storeData);
  updateMetaTags(storeData);
  addHeaderScrollEffect();
  addBreadcrumb(storeData);
  
  // Generate and inject breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema(storeData);
  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify(breadcrumbSchema, null, 2);
  document.head.appendChild(schemaScript);
};