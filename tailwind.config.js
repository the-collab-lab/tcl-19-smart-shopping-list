module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class',
   theme: {
     extend: {backgroundImage: theme => ({
      'list-button': "url('/Users/rebeccabotha/Desktop/tcl-19-smart-shopping-list/src/components/listButton.svg')",
     })},
     boxShadow: {
       top: '0px -5px 10px 0 rgba(0, 0, 0, 0.4)',
       pressed: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)'
     }
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }
