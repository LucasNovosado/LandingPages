// Main Page Controller - Orchestrates all sections

import { initHeader, validateHeaderData } from './headerActions.js';
import { handleWhatsAppClick, handleCallClick, validateHeroData } from './heroActions.js';
import { handleBenefitsCTA, initBenefitsSection } from './benefitsData.js';
import { handleMapClick, initStoreInfoSection, validateStoreInfo } from './storeInfoActions.js';
import { initFooter, addScrollToTop, generateFooterSchema, injectSchemaMarkup } from './footerActions.js';

/**
 * Main Page Controller Class
 */
export class PageController {
  constructor() {
    this.storeData = null;
    this.isInitialized = false;
    this.validationResults = {};
  }

  /**
   * Initializes the entire page
   * @param {Object} storeData - Store data object
   */
  async init(storeData) {
    try {
      this.storeData = storeData;
      
      // Validate all sections
      this.validateAllSections();
      
      // Initialize all sections
      await this.initializeAllSections();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Setup analytics
      this.setupAnalytics();
      
      // Add scroll to top button
      addScrollToTop();
      
      this.isInitialized = true;
      
      console.log('Page initialized successfully', {
        validation: this.validationResults,
        storeData: this.storeData
      });
      
    } catch (error) {
      console.error('Error initializing page:', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Validates all sections
   */
  validateAllSections() {
    this.validationResults = {
      header: validateHeaderData(this.storeData),
      hero: validateHeroData(this.storeData),
      storeInfo: validateStoreInfo(this.storeData)
    };

    // Log warnings
    Object.entries(this.validationResults).forEach(([section, result]) => {
      if (result.warnings && result.warnings.length > 0) {
        console.warn(`${section} warnings:`, result.warnings);
      }
      if (result.errors && result.errors.length > 0) {
        console.error(`${section} errors:`, result.errors);
      }
    });
  }

  /**
   * Initializes all sections
   */
  async initializeAllSections() {
    try {
      // Initialize header
      initHeader(this.storeData);
      
      // Initialize benefits section
      initBenefitsSection();
      
      // Initialize store info section
      initStoreInfoSection(this.storeData);
      
      // Initialize footer
      initFooter(this.storeData);
      
      // Generate and inject schema markup
      const footerSchema = generateFooterSchema(this.storeData);
      injectSchemaMarkup(footerSchema);
      
    } catch (error) {
      console.error('Error initializing sections:', error);
      throw error;
    }
  }

  /**
   * Sets up all event listeners
   */
  setupEventListeners() {
    // WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('.btnWhatsapp');
    whatsappButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Determine which section the button is in
        const section = this.getButtonSection(button);
        
        if (section === 'benefits') {
          handleBenefitsCTA(this.storeData.link_whatsapp, this.storeData.cidade);
        } else {
          handleWhatsAppClick(this.storeData.link_whatsapp);
        }
      });
    });

    // Call buttons
    const callButtons = document.querySelectorAll('.btnCall');
    callButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        handleCallClick(this.storeData.telefone);
      });
    });

    // Map/Route buttons
    const mapButtons = document.querySelectorAll('[data-action="map"]');
    mapButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        handleMapClick(this.storeData.link_maps, this.storeData.cidade);
      });
    });

    // Error handling for missing data
    this.setupErrorHandling();

    // Performance monitoring
    this.setupPerformanceMonitoring();
  }

  /**
   * Determines which section a button belongs to
   * @param {HTMLElement} button - Button element
   * @returns {string} Section name
   */
  getButtonSection(button) {
    const section = button.closest('.section');
    
    if (section && section.classList.contains('sectionGray')) {
      return 'benefits';
    }
    
    return 'hero';
  }

  /**
   * Sets up error handling for missing data
   */
  setupErrorHandling() {
    // Handle missing WhatsApp link
    if (!this.storeData.link_whatsapp) {
      const whatsappButtons = document.querySelectorAll('.btnWhatsapp');
      whatsappButtons.forEach(button => {
        button.style.opacity = '0.6';
        button.style.cursor = 'not-allowed';
        button.title = 'WhatsApp não disponível';
      });
    }

    // Handle missing phone
    if (!this.storeData.telefone) {
      const callButtons = document.querySelectorAll('.btnCall');
      callButtons.forEach(button => {
        button.style.display = 'none';
      });
    }

    // Handle missing maps link
    if (!this.storeData.link_maps) {
      const mapButtons = document.querySelectorAll('[data-action="map"]');
      mapButtons.forEach(button => {
        button.style.opacity = '0.6';
        button.style.cursor = 'not-allowed';
        button.title = 'Localização não disponível';
      });
    }
  }

  /**
   * Sets up analytics tracking
   */
  setupAnalytics() {
    // Track page view
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        custom_parameters: {
          cidade: this.storeData.cidade,
          estado: this.storeData.estado,
          has_phone: !!this.storeData.telefone,
          has_whatsapp: !!this.storeData.link_whatsapp,
          has_maps: !!this.storeData.link_maps,
          has_price: !!this.storeData.preco_inicial
        }
      });
    }

    // Track section visibility
    this.setupSectionTracking();

    // Track user engagement
    this.setupEngagementTracking();
  }

  /**
   * Sets up section visibility tracking
   */
  setupSectionTracking() {
    if ('IntersectionObserver' in window) {
      const sections = document.querySelectorAll('.section');
      
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionName = this.getSectionName(entry.target);
            
            if (typeof gtag !== 'undefined') {
              gtag('event', 'section_view', {
                event_category: 'engagement',
                event_label: sectionName,
                custom_parameters: {
                  cidade: this.storeData.cidade
                }
              });
            }
            
            sectionObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.5
      });

      sections.forEach(section => {
        sectionObserver.observe(section);
      });
    }
  }

  /**
   * Gets section name for analytics
   * @param {HTMLElement} section - Section element
   * @returns {string} Section name
   */
  getSectionName(section) {
    if (section.querySelector('.heroGrid')) return 'hero';
    if (section.querySelector('.benefitsGrid')) return 'benefits';
    if (section.querySelector('.storeInfoGrid')) return 'store_info';
    return 'unknown';
  }

  /**
   * Sets up user engagement tracking
   */
  setupEngagementTracking() {
    let startTime = Date.now();
    let maxScroll = 0;

    // Track scroll depth
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track milestone scroll depths
        if ([25, 50, 75, 90].includes(scrollPercent)) {
          if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
              event_category: 'engagement',
              event_label: `${scrollPercent}%`,
              custom_parameters: {
                cidade: this.storeData.cidade
              }
            });
          }
        }
      }
    };

    // Track time on page when leaving
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
          name: 'time_on_page',
          value: timeSpent,
          custom_parameters: {
            cidade: this.storeData.cidade,
            max_scroll: maxScroll
          }
        });
      }
    };

    // Throttled scroll listener
    let scrollTicking = false;
    const throttledScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          trackScrollDepth();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('beforeunload', trackTimeOnPage);
  }

  /**
   * Sets up performance monitoring
   */
  setupPerformanceMonitoring() {
    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        if (perfData && typeof gtag !== 'undefined') {
          gtag('event', 'timing_complete', {
            name: 'page_load_time',
            value: Math.round(perfData.loadEventEnd - perfData.fetchStart),
            custom_parameters: {
              cidade: this.storeData.cidade,
              dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
              first_paint: Math.round(perfData.responseEnd - perfData.fetchStart)
            }
          });
        }
      }, 0);
    });
  }

  /**
   * Handles initialization errors
   * @param {Error} error - Initialization error
   */
  handleInitializationError(error) {
    console.error('Page initialization failed:', error);

    // Track error
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_parameters: {
          error_section: 'initialization',
          cidade: this.storeData?.cidade || 'unknown'
        }
      });
    }

    // Show user-friendly error
    this.showErrorMessage('Erro ao carregar a página. Tente recarregar.');
  }

  /**
   * Shows error message to user
   * @param {string} message - Error message
   */
  showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #dc3545;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
      z-index: 1001;
      font-size: 0.9rem;
      max-width: 300px;
    `;

    document.body.appendChild(errorDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 5000);
  }

  /**
   * Updates store data and reinitializes if needed
   * @param {Object} newStoreData - New store data
   */
  async updateStoreData(newStoreData) {
    const oldData = { ...this.storeData };
    this.storeData = { ...this.storeData, ...newStoreData };

    // Check if critical data changed
    const criticalFields = ['cidade', 'telefone', 'link_whatsapp', 'link_maps', 'preco_inicial'];
    const hasChanges = criticalFields.some(field => oldData[field] !== this.storeData[field]);

    if (hasChanges && this.isInitialized) {
      console.log('Critical data changed, reinitializing...');
      await this.init(this.storeData);
    }
  }

  /**
   * Gets current validation status
   * @returns {Object} Validation results
   */
  getValidationStatus() {
    return this.validationResults;
  }

  /**
   * Gets store data
   * @returns {Object} Current store data
   */
  getStoreData() {
    return { ...this.storeData };
  }

  /**
   * Checks if page is initialized
   * @returns {boolean} Initialization status
   */
  isPageInitialized() {
    return this.isInitialized;
  }
}

// Export singleton instance
export const pageController = new PageController();

// Export for global access
if (typeof window !== 'undefined') {
  window.PageController = pageController;
}