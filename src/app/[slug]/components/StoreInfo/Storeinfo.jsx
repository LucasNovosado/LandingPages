'use client';

import { useEffect } from 'react';
import styles from './StoreInfo.module.css';
import commonStyles from '../Common.module.css';
import { initStoreInfoSection, formatPhoneNumber } from '../../js/storeInfoActions.js';

// Componente StoreInfoItem interno
function StoreInfoItem({ label, value, isPhone, isMultiline }) {
  return (
    <div className={styles.storeInfoItem}>
      <p className={styles.storeInfoLabel}>{label}</p>
      {isMultiline ? (
        <div>{value}</div>
      ) : isPhone ? (
        <p className={styles.storeInfoValue} data-phone>
          <a href={`tel:+55${value.replace(/\D/g, '')}`} aria-label={`Ligar para ${value}`}>
            {value}
          </a>
        </p>
      ) : (
        <p className={styles.storeInfoValue}>{value}</p>
      )}
    </div>
  );
}

function StoreInfo({ storeData, onMapClick }) {
  useEffect(() => {
    if (storeData) {
      initStoreInfoSection(storeData);
    }
  }, [storeData]);

  return (
    <section className={`${commonStyles.section} ${commonStyles.sectionWhite}`}>
      <div className={commonStyles.sectionContent}>
        <h2 className={commonStyles.sectionTitle}>
          Veja como nos encontrar
        </h2>
        
        <div className={styles.storeInfoGrid}>
          
          {/* Store Image */}
          <div className={styles.storeImage}>
            <img 
              src={storeData.imagem_loja}
              alt={`Rede Única de Baterias - Loja de ${storeData.cidade}`}
              loading="lazy"
            />
          </div>
          
          {/* Store Info Card */}
          <div>
            <div className={styles.storeInfoCard}>
              <h3 className={`${styles.storeInfoTitle} storeInfoTitle`}>
                Rede Única de Baterias - {storeData.cidade}
              </h3>
              
              {/* Phone Info */}
              {storeData.telefone && (
                <StoreInfoItem 
                  label="Telefone:"
                  value={formatPhoneNumber(storeData.telefone)}
                  isPhone={true}
                />
              )}
              
              {/* Address Info */}
              <StoreInfoItem 
                label="Endereço:"
                value={`${storeData.cidade}, ${storeData.estado}`}
              />
              
              {/* Business Hours */}
              <StoreInfoItem 
                label="Horário de Funcionamento:"
                value={
                  <>
                    <p className={styles.storeInfoValue}>Segunda a Sexta: 8h às 18h</p>
                    <p className={styles.storeInfoValue}>Sábado: 8h às 12h</p>
                  </>
                }
                isMultiline={true}
              />
              
              {/* Map Button */}
              {storeData.link_maps && (
                <div className={styles.mapButton}>
                  <button 
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={onMapClick}
                    data-action="map"
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
  );
}

export default StoreInfo;