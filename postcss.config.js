module.exports = {
  plugins: [
    require('postcss-import'), // Importante para resolver as diretivas @tailwind
    require('@tailwindcss/postcss'), // O plugin PostCSS para Tailwind CSS v4
    require('autoprefixer'),
  ],
};