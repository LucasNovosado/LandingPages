'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { initializeParse, getStoreBySlug } from '../../services/parseService';

// Importando os estilos separados
import storePageStyles from './styles/StorePage.module.css';
import headerStyles from './styles/Header.module.css';
import heroStyles from './styles/HeroSection.module.css';
import benefitsStyles from './styles/Benefits.module.css';
import storeInfoStyles from './styles/StoreInfo.module.css';
import alertStyles from './styles/Alert.module.css';
import testimonialsStyles from './styles/Testimonials.module.css';
import popupStyles from './styles/Popup.module.css';
import footerStyles from './styles/Footer.module.css';

export default function StorePage() {
  const params = useParams();
  const router = useRouter();
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const loadStore = async () => {
      if (!params.slug) return;
      
      try {
        setLoading(true);
        initializeParse();
        const store = await getStoreBySlug(params.slug);
        
        if (!store) {
          setError('Loja não encontrada');
          return;
        }
        
        setStoreData(store);
      } catch (err) {
        console.error('Erro ao carregar loja:', err);
        setError('Erro ao carregar os dados da loja');
      } finally {
        setLoading(false);
      }
    };

    loadStore();
  }, [params.slug]);

  const handleWhatsAppClick = () => {
    if (storeData?.popup_tipo === 'whatsapp') {
      setShowPopup(true);
    } else if (storeData?.link_whatsapp) {
      window.open(storeData.link_whatsapp, '_blank');
    }
  };

  const handleCallClick = () => {
    if (storeData?.telefone) {
      window.open(`tel:${storeData.telefone}`, '_self');
    }
  };

  const handleMapClick = () => {
    if (storeData?.link_maps) {
      window.open(storeData.link_maps, '_blank');
    }
  };

  if (loading) {
    return (
      <div className={storePageStyles.loaderContainer}>
        <div className={storePageStyles.loader}></div>
        <p className={storePageStyles.loadingText}>Carregando...</p>
      </div>
    );
  }

  if (error || !storeData) {
    return (
      <div className={storePageStyles.errorContainer}>
        <div className={storePageStyles.errorCard}>
          <h1 className={storePageStyles.errorTitle}>Loja não encontrada</h1>
          <p className={storePageStyles.errorMessage}>
            Desculpe, não conseguimos encontrar a loja que você está procurando.
          </p>
          <button 
            onClick={() => router.push('/')}
            className={`${storePageStyles.btn} ${storePageStyles.btnPrimary}`}
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={storePageStyles.container}>
      <section className={`${storePageStyles.heroFullWidth}`}>
        <div className={`${heroStyles.heroGridFullWidth}`}>
          {/* Elementos animados de fundo (partículas e linhas) - mantidos */}
          <div className={heroStyles.particles}>
            {[...Array(8)].map((_, i) => <div key={i} className={heroStyles.particle}></div>)}
          </div>
          
          {/* Linhas de energia (mantidas) */}
          {[...Array(4)].map((_, i) => <div key={i} className={heroStyles.energyLine}></div>)}
          
          <div className={`${heroStyles.heroContent} ${heroStyles.fadeInUp}`}>
            <img 
          src="/header.png" 
          alt="Rede Única de Baterias" 
          className={heroStyles.logoImage}
        />
            <h2 className={`${heroStyles.fadeInUp} ${heroStyles.delay-1}`}>
              Entrega Grátis em {storeData.cidade}
              <br />
            </h2>

            {/* Imagem do produto - movida para ficar logo após o título no mobile */}
            <div className={`${heroStyles.heroImageMobile} ${heroStyles.fadeIn} ${heroStyles.delay-2}`}>
              {storeData.imagem_produto ? (
                <img 
                  src={storeData.imagem_produto}
                  alt={`Bateria Automotiva - ${storeData.cidade}`}
                  className={heroStyles.productImage}
                />
              ) : (
                <div className={heroStyles.placeholderImage}>
                  <div className={heroStyles.placeholderIcon}>🔋</div>
                  <p className={heroStyles.placeholderText}>Bateria Automotiva</p>
                </div>
              )}
            </div>
            
            {storeData.preco_inicial && (
              <div className={`${heroStyles.priceBox} ${heroStyles.fadeInUp} ${heroStyles.delay-3}`}>
                <div className={heroStyles.priceBoxBadge}>Mais Vendida!</div>
                <span className={heroStyles.priceBoxIcon}>⚡</span>

                <div className={heroStyles.priceValue}>
                  A partir de R$ {storeData.preco_inicial}
                </div>
                <p className={heroStyles.priceNote}>
                  + Entrega e Instalação GRÁTIS
                </p>
                <p className={heroStyles.pricePayment}>
                  *À vista ou no cartão em até 12x
                </p>
              </div>
            )}
            
            <div className={`${heroStyles.buttonsContainer} ${heroStyles.fadeInUp} ${heroStyles.delay-4}`}>
              <button 
                className={`${storePageStyles.btn} ${storePageStyles.btnWhatsapp}`}
                onClick={handleWhatsAppClick}
              >
                <span className={heroStyles.btnIcon}>💬</span>
                Pedir Bateria
              </button>
              
              {storeData.telefone && (
                <button 
                  className={`${storePageStyles.btn} ${storePageStyles.btnCall}`}
                  onClick={handleCallClick}
                >
                  <span className={heroStyles.btnIcon}>📞</span>
                  Ligar Agora
                </button>
              )}
            </div>
          </div>
          
          {/* Imagem do produto - versão desktop (mantida na lateral) */}
          <div className={`${heroStyles.heroImage} ${heroStyles.fadeIn} ${heroStyles.delay-5}`}>
            {storeData.imagem_produto ? (
              <img 
                src={storeData.imagem_produto}
                alt={`Bateria Automotiva - ${storeData.cidade}`}
                className={heroStyles.productImage}
              />
            ) : (
              <div className={heroStyles.placeholderImage}>
                <div className={heroStyles.placeholderIcon}>🔋</div>
                <p className={heroStyles.placeholderText}>Bateria Automotiva</p>
              </div>
            )}
          </div>
        </div>
        {/* Indicador de Scroll Mobile (Opcional) */}
        <div className={heroStyles.scrollIndicatorMobile}></div>
      </section>

      {/* Alert Section */}
      <section className={alertStyles.alertSection}>
        <div className={storePageStyles.sectionContent}>
          <h2 className={alertStyles.alertTitle}>
            Não compre Baterias adulteradas ou "Lavadinha"
          </h2>
          
          <div className={alertStyles.alertGrid}>
            <div className={`${alertStyles.alertCard} ${alertStyles.alertCardPrimary}`}>
              <h3 className={alertStyles.alertCardTitle}>Pode causar:</h3>
              <ul className={alertStyles.alertList}>
                <li className={alertStyles.alertListItem}>Risco de Explosão</li>
                <li className={alertStyles.alertListItem}>Falhas no arranque do Veículo</li>
                <li className={alertStyles.alertListItem}>Desempenho Elétrico Insatisfatório</li>
                <li className={alertStyles.alertListItem}>Risco de Danos no Alternador</li>
                <li className={alertStyles.alertListItem}>Perigo de Vazamento de Ácido</li>
              </ul>
            </div>
            
            <div className={alertStyles.alertCard}>
              <h3 className={alertStyles.alertCardTitle}>Como identificar:</h3>
              <ul className={alertStyles.alertList}>
                <li className={alertStyles.alertListItem}>Caixa danificada</li>
                <li className={alertStyles.alertListItem}>Baterias sem adesivos</li>
                <li className={alertStyles.alertListItem}>Verifique a Procedência</li>
                <li className={alertStyles.alertListItem}>Evite Compras em Fontes Duvidosas</li>
                <li className={alertStyles.alertListItem}>Verifique a Garantia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`${storePageStyles.section} ${storePageStyles.sectionGray}`}>
        <div className={storePageStyles.sectionContent}>
          <h2 className={storePageStyles.sectionTitle}>
            Por que comprar com a Rede Única?
          </h2>
          
          <div className={benefitsStyles.benefitsGrid}>
            <div className={benefitsStyles.card}>
              <div className={benefitsStyles.cardIcon}>🛡️</div>
              <h3 className={benefitsStyles.cardTitle}>Produtos de Qualidade</h3>
              <p className={benefitsStyles.cardDescription}>
                Oferecemos produtos direto da fábrica verificado pelo INMETRO.
              </p>
            </div>
            
            <div className={benefitsStyles.card}>
              <div className={benefitsStyles.cardIcon}>💰</div>
              <h3 className={benefitsStyles.cardTitle}>Melhores Preços</h3>
              <p className={benefitsStyles.cardDescription}>
                Produtos de qualidade e com preço diferenciado.
              </p>
            </div>
            
            <div className={benefitsStyles.card}>
              <div className={benefitsStyles.cardIcon}>⚡</div>
              <h3 className={benefitsStyles.cardTitle}>Entrega e instalação Gratuita</h3>
              <p className={benefitsStyles.cardDescription}>
                Sua bateria entregue e instalada até 15km da loja.
              </p>
            </div>
          </div>
          
          <div className={benefitsStyles.ctaSection}>
            <button 
              className={`${storePageStyles.btn} ${storePageStyles.btnWhatsapp}`}
              onClick={handleWhatsAppClick}
            >
              <span>💬</span>
              Pedir Bateria Agora
            </button>
          </div>
        </div>
      </section>

      {/* Store Info Section */}
      {storeData.imagem_loja && (
        <section className={`${storePageStyles.section} ${storePageStyles.sectionWhite}`}>
          <div className={storePageStyles.sectionContent}>
            <h2 className={storePageStyles.sectionTitle}>
              Veja como nos encontrar
            </h2>
            
            <div className={storeInfoStyles.storeInfoGrid}>
              <div className={storeInfoStyles.storeImage}>
                <img 
                  src={storeData.imagem_loja}
                  alt={`Rede Única de Baterias - Loja de ${storeData.cidade}`}
                />
              </div>
              
              <div>
                <div className={storeInfoStyles.storeInfoCard}>
                  <h3 className={storeInfoStyles.storeInfoTitle}>
                    Rede Única de Baterias - {storeData.cidade}
                  </h3>
                  
                  {storeData.telefone && (
                    <div className={`${storeInfoStyles.storeInfoItem}`} data-type="phone">
                      <p className={storeInfoStyles.storeInfoLabel}>Telefone:</p>
                      <p className={storeInfoStyles.storeInfoValue}>{storeData.telefone}</p>
                    </div>
                  )}
                  
                  <div className={`${storeInfoStyles.storeInfoItem}`} data-type="address">
                    <p className={storeInfoStyles.storeInfoLabel}>Endereço:</p>
                    <p className={storeInfoStyles.storeInfoValue}>
                      {storeData.cidade}, {storeData.estado}
                    </p>
                  </div>
                  
                  <div className={`${storeInfoStyles.storeInfoItem}`} data-type="hours">
                    <p className={storeInfoStyles.storeInfoLabel}>Horário de Funcionamento:</p>
                    <p className={storeInfoStyles.storeInfoValue}>Segunda a Sexta: 8h às 18h</p>
                    <p className={storeInfoStyles.storeInfoValue}>Sábado: 8h às 12h</p>
                  </div>
                  
                  {storeData.link_maps && (
                    <div className={storeInfoStyles.mapButton}>
                      <button 
                        className={`${storePageStyles.btn} ${storePageStyles.btnPrimary}`}
                        onClick={handleMapClick}
                      >
                        <span>📍</span>
                        Traçar Rota
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className={testimonialsStyles.testimonialsSection}>
        <div className={storePageStyles.sectionContent}>
          <h2 className={testimonialsStyles.testimonialsTitle}>
            O que dizem sobre nós?
          </h2>
          
          <div className={testimonialsStyles.testimonialsGrid}>
            {[
              { id: 1, name: 'Frank da Rosa', text: 'Ótimo atendimento e o melhor preço que encontrei na região.' },
              { id: 2, name: 'Ronaldo Simões', text: 'Top, me prestaram um atendimento muito bom.' },
              { id: 3, name: 'Maria Helena', text: 'Rapidez na entrega e bateria de qualidade. Recomendo!' }
            ].map((testimonial) => (
              <div key={testimonial.id} className={testimonialsStyles.testimonialCard}>
                <div className={testimonialsStyles.testimonialHeader}>
                  <div className={testimonialsStyles.testimonialAvatar}>
                    <span className={testimonialsStyles.testimonialAvatarText}>
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className={testimonialsStyles.testimonialInfo}>
                    <h3 className={testimonialsStyles.testimonialName}>{testimonial.name}</h3>
                    <div className={testimonialsStyles.testimonialStars}>
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                  </div>
                </div>
                <p className={testimonialsStyles.testimonialText}>"{testimonial.text}"</p>
              </div>
            ))}
          </div>
          
          <div className={benefitsStyles.ctaSection}>
            <button 
              className={`${storePageStyles.btn} ${storePageStyles.btnWhatsapp}`}
              onClick={handleWhatsAppClick}
            >
              <span>💬</span>
              Pedir Bateria Agora
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={footerStyles.footer}>
        <div className={footerStyles.footerContent}>
          <div className={footerStyles.footerTop}>
            <div className={footerStyles.footerSection} data-section="company">
              <h4 className={footerStyles.footerSectionTitle}>Empresa</h4>
              <div className={footerStyles.footerInfo}>
                <span>Rede Única de Baterias</span>
                <span>CNPJ: 00.000.000/0001-00</span>
              </div>
            </div>
            
            <div className={footerStyles.footerSection} data-section="contact">
              <h4 className={footerStyles.footerSectionTitle}>Contato</h4>
              <div className={footerStyles.footerInfo}>
                {storeData.telefone && <span>{storeData.telefone}</span>}
                <span>{storeData.cidade}, {storeData.estado}</span>
              </div>
            </div>
            
            <div className={footerStyles.footerSection} data-section="social">
              <h4 className={footerStyles.footerSectionTitle}>Redes Sociais</h4>
              <div className={footerStyles.footerSocialLinks}>
                <a href="#" className={footerStyles.footerSocialLink}>📘</a>
                <a href="#" className={footerStyles.footerSocialLink}>📷</a>
                <a href="#" className={footerStyles.footerSocialLink}>💬</a>
              </div>
            </div>
          </div>
          
          <div className={footerStyles.footerDivider}></div>
          
          <div className={footerStyles.footerBottom}>
            <p className={footerStyles.footerCopyright}>
              &copy; {new Date().getFullYear()} Rede Única de Baterias. Todos os direitos reservados.
            </p>
            <div className={footerStyles.footerTagline}>
              🔋 <span className={footerStyles.footerBadge}>Líder Nacional</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Popup WhatsApp */}
      {showPopup && (
        <div className={popupStyles.popupOverlay} onClick={() => setShowPopup(false)}>
          <div className={popupStyles.popup} onClick={e => e.stopPropagation()}>
            <button 
              className={popupStyles.popupClose}
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>
            
            <div className={popupStyles.popupHeader}>
              <div className={popupStyles.popupIcon}>💬</div>
              <h3 className={popupStyles.popupTitle}>Fale Conosco</h3>
              <p className={popupStyles.popupSubtitle}>
                Envie sua mensagem e receba atendimento personalizado
              </p>
            </div>
            
            <form className={popupStyles.popupForm} onSubmit={(e) => {
              e.preventDefault();
              // Lógica do formulário aqui
              setShowPopup(false);
            }}>
              <div className={popupStyles.popupInputGroup}>
                <label className={popupStyles.popupLabel}>Seu Nome</label>
                <input 
                  type="text" 
                  className={popupStyles.popupInput}
                  placeholder="Digite seu nome"
                  required
                />
              </div>
              
              <div className={popupStyles.popupInputGroup}>
                <label className={popupStyles.popupLabel}>Telefone</label>
                <input 
                  type="tel" 
                  className={popupStyles.popupInput}
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
              
              <div className={popupStyles.popupInputGroup}>
                <label className={popupStyles.popupLabel}>Mensagem</label>
                <textarea 
                  className={`${popupStyles.popupInput} ${popupStyles.popupTextarea}`}
                  placeholder="Descreva sua necessidade..."
                  required
                />
              </div>
              
              <button type="submit" className={popupStyles.popupSubmit}>
                <span>💬</span>
                Enviar WhatsApp
              </button>
            </form>
            
            <div className={popupStyles.footerFooter}>
              <p className={popupStyles.popupFooterText}>
                Seus dados estão protegidos e não serão compartilhados
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}