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
};

module.exports = nextConfig;
