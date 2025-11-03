/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      canvas: false,
    };
    
    config.ignoreWarnings = [
      { module: /node_modules\/prisma\/build/ },
      { file: /node_modules\/prisma\/build/ },
      { file: /node_modules\/@prisma\/client/ },
    ];
    
    return config;
  },
  
  images: {
    domains: ['localhost'],
  },
  
  experimental: {
    optimizeCss: true,
  },
  
  // Desativa a verificação de tipos durante o build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Desativa a verificação do ESLint durante o build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuração para pacotes externos
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

module.exports = nextConfig;