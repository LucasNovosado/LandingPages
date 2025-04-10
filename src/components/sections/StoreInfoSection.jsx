import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import useGTM from '../../hooks/useGTM';

const StoreInfoSection = ({ storeData }) => {
  const { logMapRouteClick } = useGTM(storeData);
  
  const handleMapClick = () => {
    logMapRouteClick();
    if (storeData?.link_maps) {
      window.open(storeData.link_maps, '_blank');
    }
  };
  
  return (
    <section className="store-info-section bg-gray-light py-10">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">
          Veja como nos encontrar
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="store-image">
            {storeData?.imagem_loja ? (
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src={storeData.imagem_loja}
                  alt={`Rede Única de Baterias - Loja de ${storeData.cidade}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden shadow-lg bg-gray-300 flex justify-center items-center" style={{ height: '300px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="store-info">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">
                Rede Única de Baterias - {storeData?.cidade || 'Sua Cidade'}
              </h3>
              
              {storeData?.telefone && (
                <div className="mb-3">
                  <p className="font-semibold">Telefone:</p>
                  <p>{storeData.telefone}</p>
                </div>
              )}
              
              <div className="mb-3">
                <p className="font-semibold">Endereço:</p>
                <p>{storeData?.cidade}, {storeData?.estado}</p>
              </div>
              
              <div className="mb-3">
                <p className="font-semibold">Horário de Funcionamento:</p>
                <p>Segunda a Sexta: 8h às 18h</p>
                <p>Sábado: 8h às 12h</p>
              </div>
              
              <div className="mt-6">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleMapClick}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                      <circle cx="12" cy="9" r="2.5"></circle>
                    </svg>
                  }
                >
                  Traçar Rota
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreInfoSection;