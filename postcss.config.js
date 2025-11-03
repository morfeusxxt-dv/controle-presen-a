module.exports = {
  plugins: {
    'postcss-import': {}, // Garante que as diretivas @tailwind sejam processadas primeiro
    '@tailwindcss/postcss': {}, // O plugin oficial do Tailwind CSS v4 para PostCSS
    'autoprefixer': {}, // Adiciona prefixos de fornecedor automaticamente
  },
};