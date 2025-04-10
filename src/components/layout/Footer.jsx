import React from 'react';

const Footer = ({ storeData }) => {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container">
        <div className="text-center text-sm">
          <p className="mb-2">
            Rede Única de Baterias, a maior rede de lojas de baterias automotivas do Brasil!
          </p>
          
          {storeData && (
            <p className="mb-2">
              *Entrega Grátis até 15km da loja. Consulte horários e disponibilidade.
            </p>
          )}
          
          {storeData && storeData.preco_inicial && (
            <p className="mb-2">
              **Baterias a partir de R${storeData.preco_inicial}. Única 40Ah à vista e à base de troca.
            </p>
          )}
          
          <div className="mt-4">
            <div className="flex justify-center mb-2">
              <img 
                src="/selo-qualidade.png" 
                alt="Selo de Qualidade" 
                width={80} 
                height={80}
                className="mx-auto"
              />
            </div>
            <p className="text-xs">
              &copy; {new Date().getFullYear()} Rede Única de Baterias. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;