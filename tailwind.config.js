module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class',
   theme: {
     extend: {
       fontFamily: {
      'sans': 'Open Sans, sans-serif',
      'sans-sm': 'Lato, sans-serif',
     },
    },
     boxShadow: {
       top: '0px -5px 10px 0 rgba(0, 0, 0, 0.4)',
       xl: '0 20px 10px -5px rgba(0, 0, 0, 0.2), 0 10px 5px -5px rgba(0, 0, 0, 0.2)',
       hover: '0px 5px 10px 0 rgba(0, 0, 0, 0.4)',
       bottom: '0px 4px 6px 0 rgba(0, 0, 0, 0.2)',
      }
   },
   variants: {
     extend: {},
   },
   plugins: [require('@tailwindcss/forms')],
 }
