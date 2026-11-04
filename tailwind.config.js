/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0f172a',
          card: '#1e293b',
          accent: '#38bdf8',
          soft: '#94a3b8'
        }
      }
    }
  },
  plugins: []
}