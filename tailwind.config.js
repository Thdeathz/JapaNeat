const { HighQuality } = require('@mui/icons-material')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        default: '#272343',
        textHover: '#3da9fc',
        cardBackground: '#272343',
        cardHeadline: '#fffffe',
        secondary: '#e3f6f5',
        hightlight: '#ffd803'
      },
      screens: {
        tablet: '640px',
        laptop: '1024px',
        desktop: '1440px'
      }
    }
  },
  plugins: []
}
