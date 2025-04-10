import React from 'react';
import Button from '../ui/Button';
import useGTM from '../../hooks/useGTM';

const BenefitsSection = ({ storeData }) => {
  const { logWhatsAppClick } = useGTM(storeData);
  
  const handleWhatsAppClick = () => {
    logWhatsAppClick();
    if (storeData?.link_whatsapp) {
      window.open(storeData.link_whatsapp, '_blank');
    }
  };
  
  return (
    <section className="benefits-section bg-white py-10">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">
          Por que comprar com a Rede Única?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Benefício 1 */}
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary rounded-full p-4 inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary">Produtos de Qualidade</h3>
            <p className="text-gray-600">
              Oferecemos produtos direto da fábrica verificado pelo INMETRO.
            </p>
          </div>
          
          {/* Benefício 2 */}
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary rounded-full p-4 inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary">Melhores Preços</h3>
            <p className="text-gray-600">
              Produtos de qualidade e com preço diferenciado.
            </p>
          </div>
          
          {/* Benefício 3 */}
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary rounded-full p-4 inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary">Entrega e instalação Gratuita</h3>
            <p className="text-gray-600">
              Sua bateria entregue e instalada até 15km da loja.
            </p>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Button 
            variant="whatsapp" 
            size="lg" 
            onClick={handleWhatsAppClick}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            }
          >
            Pedir Bateria Agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;