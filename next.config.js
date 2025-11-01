/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Habilita a exportação estática para o Vercel
  output: 'standalone',
  
  // Configurações de imagens otimizadas
  images: {
    domains: ['vercel.com'],
  },
  
  // Configuração para caminhos absolutos
  webpack: (config, { isServer }) => {
    // Adiciona suporte para SQLite no navegador
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    
    return config;
  },
  
  // Configuração para TypeScript
  typescript: {
    // Ignorar erros de tipagem durante a construção
    ignoreBuildErrors: true,
  },
  
  // Configuração para ESLint
  eslint: {
    // Ignorar erros de ESLint durante a construção
    ignoreDuringBuilds: true,
  },
  
  // Configuração para permitir o uso de módulos nativos
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
};

// Para ambiente de desenvolvimento, usamos o SQLite
if (process.env.NODE_ENV !== 'production') {
  process.env.DATABASE_URL = 'file:./dev.db';
}

module.exports = nextConfig;
