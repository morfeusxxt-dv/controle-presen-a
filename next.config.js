/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  
  typescript: {
    // ignoreBuildErrors: true, // Removido para garantir que os erros de tipo sejam tratados
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    domains: ['localhost'],
  },
  
  // Removed experimental.optimizeCss to avoid potential PostCSS conflicts
  // experimental: {
  //   optimizeCss: true,
  // },
  
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      canvas: false,
    };
    
    return config;
  },
}

module.exports = nextConfig;