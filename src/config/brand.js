// =========================================
// CONFIGURAÇÃO DA MARCA
// =========================================
// Para trocar de marca, apenas altere o valor de CURRENT_BRAND_NAME
// e configure o objectId correspondente no BRAND_CONFIGS

export const CURRENT_BRAND_NAME = "Rede única";

// =========================================
// CONFIGURAÇÕES ESPECÍFICAS POR MARCA
// =========================================
export const BRAND_CONFIGS = {
  "Rede Única": {
    siteName: "Rede Única",
    tagline: "A maior rede de baterias automotivas do Brasil",
    logoPath: "/logo.png",
    faviconPath: "/favicon.ico",
    primaryColor: "#003399",
    secondaryColor: "#ffcc00",
    icon: "🔋",
    objectId: "cGCJDWwDs1", // ← OBJECTID DA MARCA NO PARSE
    whatsappDefaultMessage: "Olá! Vi a landing page de baterias e gostaria de mais informações.",
    socialMedia: {
      facebook: "https://www.facebook.com/redeunicadebaterias",
      instagram: "https://www.instagram.com/redeunicadebaterias"
    }
  },
  "Baterias Power Plus": {
    siteName: "Baterias Power Plus",
    tagline: "Força e qualidade para seu veículo",
    logoPath: "/logo-power-plus.png",
    faviconPath: "/favicon-power-plus.ico",
    primaryColor: "#e23c39",
    secondaryColor: "#ffffff",
    icon: "⚡",
    objectId: "PxdpuSqlQn", // ← OBJECTID DA MARCA NO PARSE
    whatsappDefaultMessage: "Olá! Vi a landing page da Power Plus e gostaria de mais informações.",
    socialMedia: {
      facebook: "https://www.facebook.com/bateriapowerplus",
      instagram: "https://www.instagram.com/bateriapowerplus"
    }
  },
  "TESTE": {
    siteName: "Marca Teste",
    tagline: "Marca para testes do sistema",
    logoPath: "/logo-teste.png",
    faviconPath: "/favicon-teste.ico",
    primaryColor: "#666666",
    secondaryColor: "#cccccc",
    icon: "🔧",
    objectId: null, // ← SEM OBJECTID, VAI BUSCAR POR NOME
    whatsappDefaultMessage: "Olá! Vi o site de teste e gostaria de mais informações.",
    socialMedia: {
      facebook: "#",
      instagram: "#"
    }
  }
};

// Função para obter as configurações da marca atual
export const getCurrentBrandConfig = () => {
  return BRAND_CONFIGS[CURRENT_BRAND_NAME] || BRAND_CONFIGS["Rede Única"];
};

// Função para obter o nome da marca atual
export const getCurrentBrandName = () => {
  return CURRENT_BRAND_NAME;
};