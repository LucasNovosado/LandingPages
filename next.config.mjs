/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [
        'parsefiles.back4app.com', // Permitir imagens do Back4App
        'unicabaterias.com.br',    // Permitir imagens do próprio domínio
      ],
    },
    // Configuração para cacheamento de imagens e contentos estáticos
    compiler: {
      // Remover console.logs em produção, mas manter os warnings e errors
      removeConsole: process.env.NODE_ENV === 'production' 
        ? { exclude: ['warn', 'error'] } 
        : false,
    },
    // Otimização para SEO
    poweredByHeader: false, // Remove o header "X-Powered-By: Next.js"
    // Configuração para redirects (se necessário)
    async redirects() {
      return [
        // Exemplo: redirecionar URLs antigas
        // {
        //   source: '/bateria/:slug',
        //   destination: '/:slug',
        //   permanent: true,
        // },
      ];
    },
  };
  
  export default nextConfig;