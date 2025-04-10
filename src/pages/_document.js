import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Preconnect para Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Montserrat Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Definindo cores do tema para navegadores */}
        <meta name="theme-color" content="#003399" />
        <meta name="msapplication-navbutton-color" content="#003399" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#003399" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}