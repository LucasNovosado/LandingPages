import Parse from 'parse/dist/parse.min.js';
import { getCurrentBrandName, getCurrentBrandConfig } from '../config/brand';

// Inicialização do Parse
export const initializeParse = () => {
  if (typeof window !== 'undefined') {
    Parse.initialize(
      process.env.NEXT_PUBLIC_PARSE_APP_ID,
      process.env.NEXT_PUBLIC_PARSE_JS_KEY
    );
    Parse.serverURL = process.env.NEXT_PUBLIC_PARSE_SERVER_URL;
    console.log('✅ Parse inicializado com sucesso');
    console.log('🔗 Parse Server URL:', process.env.NEXT_PUBLIC_PARSE_SERVER_URL);
  }
};

// Função para buscar uma marca pelo nome
export const getBrandByName = async (brandName) => {
  try {
    const Brand = Parse.Object.extend('Marcas');
    const query = new Parse.Query(Brand);
    query.equalTo('nome', brandName);
    const brand = await query.first();
    
    if (!brand) {
      console.error(`❌ Marca "${brandName}" não encontrada no banco de dados`);
      return null;
    }
    
    console.log(`✅ Marca encontrada: ${brand.get('nome')} (ID: ${brand.id})`);
    return brand;
  } catch (error) {
    console.error('❌ Erro ao buscar marca:', error);
    return null;
  }
};

// Função para buscar uma marca pelo objectId
export const getBrandById = async (objectId) => {
  try {
    const Brand = Parse.Object.extend('Marcas');
    const query = new Parse.Query(Brand);
    const brand = await query.get(objectId);
    
    if (!brand) {
      console.error(`❌ Marca com ID "${objectId}" não encontrada`);
      return null;
    }
    
    console.log(`✅ Marca encontrada por ID: ${brand.get('nome')} (ID: ${brand.id})`);
    return brand;
  } catch (error) {
    console.error('❌ Erro ao buscar marca por ID:', error);
    return null;
  }
};

// Função principal para buscar lojas da marca configurada
export const getAllStores = async () => {
  try {
    console.log('\n🔍 === BUSCANDO LOJAS DA MARCA CONFIGURADA ===');
    
    const brandConfig = getCurrentBrandConfig();
    const currentBrandName = getCurrentBrandName();
    
    console.log(`🏷️ Marca configurada: "${currentBrandName}"`);
    console.log(`🆔 ObjectId configurado: "${brandConfig.objectId || 'não definido'}"`);
    
    let brand = null;
    
    // Primeiro tenta buscar pelo objectId (se definido na configuração)
    if (brandConfig.objectId) {
      console.log(`🎯 Buscando marca pelo objectId: ${brandConfig.objectId}`);
      brand = await getBrandById(brandConfig.objectId);
    }
    
    // Se não encontrou por ID ou não tem ID configurado, tenta buscar por nome
    if (!brand) {
      console.log('🔄 Buscando marca pelo nome...');
      brand = await getBrandByName(currentBrandName);
    }
    
    if (!brand) {
      console.error(`❌ Marca "${currentBrandName}" não encontrada!`);
      console.error(`💡 Verifique se o objectId "${brandConfig.objectId}" ou nome da marca estão corretos`);
      return [];
    }
    
    // Agora busca as lojas desta marca
    console.log(`🔎 Buscando lojas da marca: ${brand.get('nome')} (ID: ${brand.id})`);
    
    const Store = Parse.Object.extend('Lojas');
    const storeQuery = new Parse.Query(Store);
    
    // Múltiplas tentativas de busca para garantir que encontre as lojas
    
    // Método 1: Busca por pointer usando o objeto da marca
    storeQuery.equalTo('marca_id', brand);
    storeQuery.include('marca_id');
    storeQuery.limit(1000);
    
    let stores = await storeQuery.find();
    console.log(`Método 1 (objeto marca) - Lojas encontradas: ${stores.length}`);
    
    // Método 2: Se não encontrou, tenta com pointer manual
    if (stores.length === 0) {
      console.log('🔄 Tentando método 2 com pointer manual...');
      const storeQuery2 = new Parse.Query(Store);
      storeQuery2.equalTo('marca_id', {
        __type: 'Pointer',
        className: 'Marcas',
        objectId: brand.id
      });
      storeQuery2.include('marca_id');
      storeQuery2.limit(1000);
      
      stores = await storeQuery2.find();
      console.log(`Método 2 (pointer manual) - Lojas encontradas: ${stores.length}`);
    }
    
    // Método 3: Se ainda não encontrou, busca todas e filtra
    if (stores.length === 0) {
      console.log('🔄 Tentando método 3 - buscar todas e filtrar...');
      const storeQuery3 = new Parse.Query(Store);
      storeQuery3.include('marca_id');
      storeQuery3.limit(1000);
      
      const allStores = await storeQuery3.find();
      console.log(`Total de lojas no banco: ${allStores.length}`);
      
      // Filtra manualmente as lojas da marca
      stores = allStores.filter(store => {
        const storeBrand = store.get('marca_id');
        if (storeBrand && storeBrand.id === brand.id) {
          return true;
        }
        return false;
      });
      
      console.log(`Método 3 (filtro manual) - Lojas encontradas: ${stores.length}`);
    }
    
    // Processa e retorna os dados das lojas
    if (stores.length > 0) {
      console.log(`✅ ${stores.length} lojas encontradas da ${brand.get('nome')}:`);
      
      const processedStores = stores
        .filter(store => store.get('ativa') !== false) // Só lojas ativas
        .map(store => {
          const storeData = {
            slug: store.get('slug'),
            cidade: store.get('cidade'),
            estado: store.get('estado'),
            telefone: store.get('telefone'),
            preco_inicial: store.get('preco_inicial'),
            ativa: store.get('ativa')
          };
          
          console.log(`   - ${storeData.cidade} (${storeData.estado}) - Ativa: ${storeData.ativa}`);
          return storeData;
        });
      
      console.log(`✅ Retornando ${processedStores.length} lojas ativas`);
      return processedStores;
      
    } else {
      console.error('❌ NENHUMA LOJA ENCONTRADA!');
      
      // Debug adicional
      await debugStoresBrandRelation(brand);
      
      return [];
    }
    
  } catch (error) {
    console.error('❌ Erro em getAllStores:', error);
    return [];
  }
};

// Função de debug para investigar a relação entre lojas e marcas
const debugStoresBrandRelation = async (targetBrand) => {
  try {
    console.log('\n🔍 === DEBUG RELAÇÃO LOJAS-MARCAS ===');
    
    const Store = Parse.Object.extend('Lojas');
    const allStoresQuery = new Parse.Query(Store);
    allStoresQuery.include('marca_id');
    allStoresQuery.limit(1000);
    
    const allStores = await allStoresQuery.find();
    console.log(`📊 Total de lojas no banco: ${allStores.length}`);
    
    // Analisa cada loja
    const brandAnalysis = {};
    let storesWithoutBrand = 0;
    
    allStores.forEach((store, index) => {
      const brand = store.get('marca_id');
      const cidade = store.get('cidade');
      const ativa = store.get('ativa');
      
      if (!brand) {
        storesWithoutBrand++;
        console.log(`${index + 1}. ${cidade} - SEM MARCA - Ativa: ${ativa}`);
      } else {
        const brandName = brand.get('nome');
        const brandId = brand.id;
        
        if (!brandAnalysis[brandName]) {
          brandAnalysis[brandName] = { count: 0, id: brandId, cities: [] };
        }
        brandAnalysis[brandName].count++;
        brandAnalysis[brandName].cities.push(`${cidade} (${ativa ? 'Ativa' : 'Inativa'})`);
        
        // Destaca se é da marca alvo
        const isTarget = brandId === targetBrand.id ? ' ⭐ TARGET' : '';
        console.log(`${index + 1}. ${cidade} - Marca: "${brandName}" (${brandId})${isTarget} - Ativa: ${ativa}`);
      }
    });
    
    console.log('\n📈 RESUMO POR MARCA:');
    Object.keys(brandAnalysis).forEach(brandName => {
      const data = brandAnalysis[brandName];
      console.log(`🏷️ ${brandName} (${data.id}): ${data.count} lojas`);
      data.cities.forEach(city => console.log(`   - ${city}`));
    });
    
    console.log(`\n❓ Lojas sem marca: ${storesWithoutBrand}`);
    console.log('=================================\n');
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
  }
};

// Função para buscar uma loja pelo slug
export const getStoreBySlug = async (slug) => {
  try {
    const brandConfig = getCurrentBrandConfig();
    const currentBrandName = getCurrentBrandName();
    
    let brand = null;
    
    // Busca a marca da mesma forma que getAllStores
    if (brandConfig.objectId) {
      brand = await getBrandById(brandConfig.objectId);
    }
    
    if (!brand) {
      brand = await getBrandByName(currentBrandName);
    }
    
    if (!brand) {
      return null;
    }
    
    const Store = Parse.Object.extend('Lojas');
    const query = new Parse.Query(Store);
    query.equalTo('slug', slug);
    query.equalTo('marca_id', brand);
    query.include('marca_id');
    
    const store = await query.first();
    
    if (!store) {
      console.log(`❌ Loja "${slug}" não encontrada para a marca "${currentBrandName}"`);
      return null;
    }
    
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
      meta_title: store.get('meta_title') || `Baterias em ${store.get('cidade')} - ${currentBrandName}`,
      meta_description: store.get('meta_description') || `Baterias novas com o melhor preço em ${store.get('cidade')}. Atendimento imediato e garantia de fábrica.`,
      precos: prices
    };
  } catch (error) {
    console.error('❌ Erro ao buscar loja:', error);
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
    console.error('❌ Erro ao buscar preços:', error);
    return {
      bateria_60ah: 0,
      bateria_70ah: 0,
      bateria_150ah: 0
    };
  }
};

// Função de debug completo - mantida para compatibilidade
export const debugBrandAndStores = async () => {
  console.log('⚠️ debugBrandAndStores() foi substituída por getAllStores() otimizada');
  return await getAllStores();
};

export default {
  initializeParse,
  getBrandByName,
  getBrandById,
  getStoreBySlug,
  getPricesByState,
  getAllStores,
  debugBrandAndStores
};