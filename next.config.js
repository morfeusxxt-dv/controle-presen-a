/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  webpack: (config, { isServer }) => {
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
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  
  experimental: {
    swcMinify: true,
    optimizeCss: true,
    optimizeFonts: true,
  },
  
  async redirects() {
    return [];
  }
}

module.exports = nextConfig;