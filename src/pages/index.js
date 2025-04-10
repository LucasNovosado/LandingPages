import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { initializeParse, getAllStores } from '../services/parseService';

export default function Home({ stores }) {
  // Inicializa o Parse no lado do cliente
  useEffect(() => {
    initializeParse();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Rede Única de Baterias - A maior rede de baterias automotivas do Brasil</title>
        <meta name="description" content="Encontre as melhores baterias automotivas com garantia de fábrica. Entrega e instalação grátis. Presentes em mais de 50 cidades." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Image 
              src="/logo.png" 
              alt="Rede Única de Baterias" 
              width={200} 
              height={70}
              priority
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Baterias Automotivas com Garantia
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Encontre a bateria ideal para seu veículo em uma das lojas da Rede Única de Baterias, a maior rede de baterias automotivas do Brasil.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Selecione a loja mais próxima de você
          </h2>
          
          {stores && stores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stores.map((store) => (
                <Link
                  href={`/${store.slug}`}
                  key={store.slug}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-semibold text-primary">
                    {store.cidade}
                  </div>
                  <div className="text-sm text-gray-600">
                    {store.estado}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              Carregando lojas disponíveis...
            </p>
          )}
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Por que escolher a Rede Única de Baterias?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Garantia de Qualidade</h3>
              <p className="text-gray-600">
                Todas as nossas baterias possuem garantia de fábrica e certificação do INMETRO.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">
                Entrega e instalação gratuitas em até 15km da loja mais próxima de você.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Melhores Preços</h3>
              <p className="text-gray-600">
                Oferecemos os melhores preços do mercado e diversas formas de pagamento.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} Rede Única de Baterias. Todos os direitos reservados.
          </p>
          <p className="text-sm">
            A maior rede de lojas de baterias automotivas do Brasil!
          </p>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  // Inicializa o Parse
  initializeParse();
  
  try {
    // Busca todas as lojas para exibir na página inicial
    const storesData = await getAllStores();
    
    // Se não encontrar lojas, retorna array vazio
    if (!storesData || storesData.length === 0) {
      return {
        props: {
          stores: [],
        },
        revalidate: 3600, // Revalidar a cada 1 hora
      };
    }
    
    // Organiza as lojas em ordem alfabética
    const sortedStores = storesData.sort((a, b) => 
      a.cidade > b.cidade ? 1 : a.cidade < b.cidade ? -1 : 0
    );
    
    return {
      props: {
        stores: sortedStores,
      },
      revalidate: 3600, // Revalidar a cada 1 hora
    };
  } catch (error) {
    console.error('Erro ao buscar lojas:', error);
    return {
      props: {
        stores: [],
      },
      revalidate: 60, // Tentar novamente em 1 minuto em caso de erro
    };
  }
}