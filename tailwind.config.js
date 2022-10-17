/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        default: '#272343',
        textHover: '#3da9fc'
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
