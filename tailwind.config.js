/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#059669',   // emerald green
          600: '#047857',
          700: '#065f46',
          800: '#064e3b',
          900: '#022c22',
        },
      },
    },
  },
  plugins: [],
}
