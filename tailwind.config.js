/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{ 
        primary: '#116149',
        secondary: '#00684A',
        textColor: '#f1f1f1',
        borderColor: 'rgba(0,0,0,.2)',
        offWhite: '#fafafa',
        backGroundColor: 'rgba(0, 0, 0, 0.32)'
      }
    },
  },
  plugins: [],
}