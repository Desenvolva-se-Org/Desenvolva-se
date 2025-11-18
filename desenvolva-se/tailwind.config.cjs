/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        cardBg: 'var(--color-card-bg)', 
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
        title: ['Poppins', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}