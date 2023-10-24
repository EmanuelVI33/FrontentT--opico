module.exports = {
  tailwindConfig: './tailwind.config.cjs',
  plugins: [require('prettier-plugin-tailwindcss')],
  semi: false, // Desactiva el uso de puntos y comas
  singleQuote: true, // Utiliza comillas simples en lugar de dobles
  trailingComma: 'es5',
  trailingComma: 'none',
  multilineTernary: 'always'
}
