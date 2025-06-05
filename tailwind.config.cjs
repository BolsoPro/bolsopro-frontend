/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004E64',
          dark: '#003D4F',
        },
        secondary: {
          DEFAULT: '#00A5CF',
          dark: '#0094B8',
        },
        accent: {
          DEFAULT: '#9FFFCB',
          dark: '#7FFFC0',
        },
        background: {
          DEFAULT: '#F5F5F5',
          dark: '#E5E5E5',
        },
        success: {
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
        },
        warning: {
          DEFAULT: '#FFC107',
          dark: '#FFA000',
        },
        error: {
          DEFAULT: '#F44336',
          dark: '#D32F2F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 4px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
} 