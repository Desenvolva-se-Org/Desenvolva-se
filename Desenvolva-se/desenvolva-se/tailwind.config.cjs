/** @type {import('tailwindcss').Config} */
module.exports = {
  // Habilita o modo escuro usando a classe 'dark' no elemento <html>
  darkMode: 'class', 
  content: [
    // Garante que o Tailwind escaneie todos os arquivos React para encontrar classes
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Referenciando as variáveis CSS definidas em globals.css
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        cardBg: 'var(--color-card-bg)', 
      },
      fontFamily: {
        // Define as fontes para uso em classes Tailwind (ex: font-title)
        sans: ['Inter', 'sans-serif'], 
        title: ['Poppins', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}