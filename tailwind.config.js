module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {},
     boxShadow: {
       top: '0px -5px 10px 0 rgba(0, 0, 0, 0.4)'
     }
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }
