import Parse from 'parse/dist/parse.min.js';

// Inicialização do Parse
export const initializeParse = () => {
  // Verificamos se estamos no lado do cliente para evitar erros durante o SSR
  if (typeof window !== 'undefined') {
    Parse.initialize(
      process.env.NEXT_PUBLIC_PARSE_APP_ID,
      process.env.NEXT_PUBLIC_PARSE_JS_KEY
    );
    Parse.serverURL = process.env.NEXT_PUBLIC_PARSE_SERVER_URL;
    console.log('Parse inicializado com sucesso');
  }
};

// Função para buscar uma loja pelo slug
export const getStoreBySlug = async (slug) => {
  try {
    const Store = Parse.Object.extend('Lojas');
    const query = new Parse.Query(Store);
    query.equalTo('slug', slug);
    const store = await query.first();
    
    if (!store) {
      return null;
    }
    
    // Busca os preços baseados no estado da loja
    const state = store.get('estado');
    const prices = await getPricesByState(state);
    
    return {
      id: store.id,
      slug: store.get('slug'),
      cidade: store.get('cidade'),
      estado: store.get('estado'),
      telefone: store.get('telefone'),
      preco_inicial: store.get('preco_inicial'),
      imagem_produto: store.get('imagem_produto')?.url(),
      imagem_loja: store.get('imagem_loja')?.url(),
      link_whatsapp: store.get('link_whatsapp'),
      link_maps: store.get('link_maps'),
      popup_tipo: store.get('popup_tipo') || 'whatsapp',
      meta_title: store.get('meta_title') || `Baterias em ${store.get('cidade')} - Rede Única de Baterias`,
      meta_description: store.get('meta_description') || `Baterias novas com o melhor preço em ${store.get('cidade')}. Atendimento imediato e garantia de fábrica.`,
      precos: prices
    };
  } catch (error) {
    console.error('Erro ao buscar loja:', error);
    return null;
  }
};

// Função para buscar preços por estado
export const getPricesByState = async (state) => {
  try {
    const Prices = Parse.Object.extend('Precos');
    const query = new Parse.Query(Prices);
    query.equalTo('estado', state);
    const prices = await query.first();
    
    if (!prices) {
      return {
        bateria_60ah: 0,
        bateria_70ah: 0,
        bateria_150ah: 0
      };
    }
    
    return {
      bateria_60ah: prices.get('bateria_60ah') || 0,
      bateria_70ah: prices.get('bateria_70ah') || 0,
      bateria_150ah: prices.get('bateria_150ah') || 0
    };
  } catch (error) {
    console.error('Erro ao buscar preços:', error);
    return {
      bateria_60ah: 0,
      bateria_70ah: 0,
      bateria_150ah: 0
    };
  }
};

// Função para listar todas as lojas (para getStaticPaths)
export const getAllStores = async () => {
  try {
    const Store = Parse.Object.extend('Lojas');
    const query = new Parse.Query(Store);
    const stores = await query.find();
    
    return stores.map(store => ({
      slug: store.get('slug')
    }));
  } catch (error) {
    console.error('Erro ao listar lojas:', error);
    return [];
  }
};

export default {
  initializeParse,
  getStoreBySlug,
  getPricesByState,
  getAllStores
};