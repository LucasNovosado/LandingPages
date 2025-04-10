import React from 'react';

const AlertSection = () => {
  return (
    <section className="alert-section bg-danger text-white py-8">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Não compre Baterias adulteradas ou "Lavadinha"
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-danger-dark p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Pode causar:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Risco de Explosão</li>
              <li>Falhas no arranque do Veículo</li>
              <li>Desempenho Elétrico Insatisfatório</li>
              <li>Risco de Danos no Alternador</li>
              <li>Perigo de Vazamento de Ácido</li>
            </ul>
          </div>
          
          <div className="card bg-primary p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Como identificar:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Caixa danificada</li>
              <li>Baterias sem adesivos</li>
              <li>Verifique a Procedência</li>
              <li>Evite Compras em Fontes Duvidosas</li>
              <li>Verifique a Garantia</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertSection;