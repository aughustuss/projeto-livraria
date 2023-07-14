/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{ 
        primary: '#116149',
        secondary: '#08192b',
        secondaryLigth: '#15273b',
        tertiary: '#55FB85',
        textColor: '#f1f1f1',
        secondaryTextColor: '#3d4f58',
        borderColor: 'rgba(0,0,0,.2)',
        offWhite: '#fafafa',
        backGroundColor: 'rgba(0, 0, 0, 0.32)',
        bgWhite: '#fcfcfc',
      },
      fontFamily: {
        bodyFont: ['Roboto', 'sans-serif'],
        headingFont:['Merriweather','serif']
      }
    },
  },
  plugins: [],
}