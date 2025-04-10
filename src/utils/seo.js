// Gera título SEO para a página
export const generateTitle = (storeData) => {
    if (!storeData) return 'Rede Única de Baterias - Bateria Automotiva com Garantia';
    
    // Se tiver um meta_title personalizado, usa ele
    if (storeData.meta_title) {
      return storeData.meta_title;
    }
    
    // Caso contrário, gera um título padrão
    return `Bateria Automotiva em ${storeData.cidade} - Rede Única de Baterias - A partir de ${storeData.preco_inicial ? `R$${storeData.preco_inicial}` : 'R$150'}`;
  };
  
  // Gera descrição SEO para a página
  export const generateDescription = (storeData) => {
    if (!storeData) return 'Baterias automotivas com garantia, entrega e instalação. Rede Única, a maior rede de baterias do Brasil.';
    
    // Se tiver meta_description personalizada, usa ela
    if (storeData.meta_description) {
      return storeData.meta_description;
    }
    
    // Caso contrário, gera uma descrição padrão
    return `Baterias automotivas em ${storeData.cidade} a partir de R$${storeData.preco_inicial || '150'}. Entrega e instalação grátis. Atendimento imediato. Garantia de fábrica. Rede Única de Baterias.`;
  };
  
  // Gera canonical URL
  export const generateCanonical = (slug) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unicabaterias.com.br';
    
    if (!slug) return baseUrl;
    
    return `${baseUrl}/${slug}`;
  };
  
  // Gera estrutura de dados para Schema.org (LocalBusiness)
  export const generateLocalBusinessSchema = (storeData) => {
    if (!storeData) return null;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': `Rede Única de Baterias - ${storeData.cidade}`,
      'description': storeData.meta_description || `Baterias automotivas em ${storeData.cidade} com entrega e instalação grátis.`,
      'image': storeData.imagem_loja,
      'telephone': storeData.telefone,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': storeData.cidade,
        'addressRegion': storeData.estado
      },
      'priceRange': '$$',
      'openingHours': 'Mo-Sa 08:00-18:00',
      'sameAs': [
        'https://www.facebook.com/redeunicadebaterias',
        'https://www.instagram.com/redeunicadebaterias'
      ]
    };
  };
  
  // Gera meta tags para redes sociais (Open Graph)
  export const generateOpenGraphTags = (storeData, canonical) => {
    const title = generateTitle(storeData);
    const description = generateDescription(storeData);
    
    const tags = [
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:url', content: canonical },
      { property: 'twitter:title', content: title },
      { property: 'twitter:description', content: description }
    ];
    
    // Adiciona a imagem da loja ou da bateria, se disponível
    if (storeData?.imagem_produto) {
      tags.push({ property: 'og:image', content: storeData.imagem_produto });
      tags.push({ property: 'twitter:image', content: storeData.imagem_produto });
    } else if (storeData?.imagem_loja) {
      tags.push({ property: 'og:image', content: storeData.imagem_loja });
      tags.push({ property: 'twitter:image', content: storeData.imagem_loja });
    }
    
    return tags;
  };
  
  // Gera keywords para metadados
  export const generateKeywords = (storeData) => {
    if (!storeData) {
      return 'bateria, bateria automotiva, baterias, rede única, bateria carro';
    }
    
    return `bateria ${storeData.cidade}, bateria automotiva ${storeData.cidade}, troca de bateria ${storeData.cidade}, bateria de carro ${storeData.cidade}, bateria heliar ${storeData.cidade}, rede única de baterias ${storeData.cidade}, bateria barata ${storeData.cidade}`;
  };
  
  export default {
    generateTitle,
    generateDescription,
    generateCanonical,
    generateLocalBusinessSchema,
    generateOpenGraphTags,
    generateKeywords
  };