/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#F5F7F2', // Light sage
        'accent-2': '#E8EDE3', // Lighter forest green
        'accent-7': '#2C392F', // Deep forest
        'forest': {
          100: '#F5F7F2',
          200: '#E8EDE3',
          300: '#D1DCCA',
          400: '#A3B899',
          500: '#718F67',
          600: '#4F6F46',
          700: '#2C392F',
          800: '#1F2922',
          900: '#141A16'
        },
        'earth': {
          100: '#F7F3ED',
          200: '#E5D7C3',
          300: '#D3BC9B',
          400: '#C1A174',
          500: '#9B7B4B',
          600: '#755D39',
          700: '#503F27',
          800: '#2A2115',
          900: '#15110A'
        },
        success: '#718F67',
        cyan: '#A3B899',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        md: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}