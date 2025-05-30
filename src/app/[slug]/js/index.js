// Main index file for all JavaScript modules

// Export page controller (main orchestrator)
export { pageController, PageController } from './pageController.js';

// Export section-specific actions
export * from './headerActions.js';
export * from './heroActions.js';
export * from './benefitsData.js';
export * from './storeInfoActions.js';
export * from './footerActions.js';

// Export commonly used utilities
export {
  handleWhatsAppClick,
  handleCallClick,
  formatPrice,
  validateHeroData
} from './heroActions.js';

export {
  handleBenefitsCTA,
  defaultBenefits,
  getBenefits
} from './benefitsData.js';

export {
  handleMapClick,
  formatPhoneNumber,
  getStoreAddress
} from './storeInfoActions.js';

export {
  getCurrentYear,
  generateFooterSchema,
  addScrollToTop
} from './footerActions.js';

// Utility function to initialize everything at once
export const initializeStorePage = async (storeData) => {
  const { pageController } = await import('./pageController.js');
  return pageController.init(storeData);
};