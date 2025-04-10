import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { generateTitle, generateDescription, generateCanonical, generateLocalBusinessSchema } from '../../utils/seo';
import styles from './StoreLayout.module.css';

const StoreLayout = ({ children, storeData }) => {
  const title = generateTitle(storeData);
  const description = generateDescription(storeData);
  const canonical = generateCanonical(storeData?.slug);
  const schema = storeData ? generateLocalBusinessSchema(storeData) : null;
  
  return (
    <div className={styles.layoutContainer}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonical} />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {storeData?.imagem_produto && (
          <meta property="og:image" content={storeData.imagem_produto} />
        )}
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonical} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        {storeData?.imagem_produto && (
          <meta property="twitter:image" content={storeData.imagem_produto} />
        )}
        
        {/* Schema.org */}
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
      </Head>
      
      <Header storeData={storeData} />
      
      <main className={styles.main}>
        {children}
      </main>
      
      <Footer storeData={storeData} />
    </div>
  );
};

export default StoreLayout;