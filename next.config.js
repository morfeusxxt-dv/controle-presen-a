/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  
  // Configurações básicas
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configurações de imagens otimizadas
  images: {
    domains: ['vercel.com'],
  },
  
  // Configuração experimental para melhorar o build
  experimental: {
    forceSwcTransforms: true,
  },
  
  // Configuração do webpack
  webpack: (config, { isServer }) => {
    // Ignorar avisos específicos
    config.ignoreWarnings = [
      { module: /node_modules\/prisma\/build/ },
      { file: /node_modules\/prisma\/build/ },
      { file: /node_modules\/@prisma\/client/ },
    ];

    // Adiciona suporte para SQLite no navegador
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }

    // Adiciona suporte para o Prisma
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
  
  // Configuração para TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuração para ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuração para permitir o uso de módulos nativos
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
};

// Configuração do banco de dados
if (process.env.NODE_ENV !== 'production') {
  process.env.DATABASE_URL = 'file:./prisma/dev.db';
} else {
  // Configuração para produção (Vercel)
  process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./prisma/prod.db';
}

module.exports = nextConfig;
