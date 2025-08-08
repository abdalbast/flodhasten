/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moomin: {
          blue: {
            300: '#23BFFF',
            700: '#0E1117'
          },
          yellow: { 400: '#F8D94E' },
          purple: { 400: '#C48BFF' },
          green: { 500: '#27ae60' },
          red: { 500: '#e74c3c' }
        }
      },
      borderRadius: {
        pill: '999px'
      }
    },
  },
  plugins: [],
};