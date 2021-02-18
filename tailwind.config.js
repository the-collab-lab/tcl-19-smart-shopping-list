module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class',
   theme: {
     extend: {},
     boxShadow: {
       top: '0px -5px 10px 0 rgba(0, 0, 0, 0.4)',
       xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      }
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }
