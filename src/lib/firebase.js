// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// var firebaseConfig = {
//   apiKey: 'AIzaSyDkkI5lYPGdkqxNh4oJqy31vnh71-24Kjg',
//   authDomain: 'tcl-19-shopping-list.firebaseapp.com',
//   projectId: 'tcl-19-shopping-list',
//   storageBucket: 'tcl-19-shopping-list.appspot.com',
//   messagingSenderId: '87812804490',
//   appId: '1:87812804490:web:5768b2db06dd2c29bf0273',
// };

var firebaseConfig = {
  apiKey: 'AIzaSyB6bXvPV0Zd1v9YQpysOLCiTiI5YCDE1Fk',
  authDomain: 'tcl-19-smart-shopping-list-2.firebaseapp.com',
  projectId: 'tcl-19-smart-shopping-list-2',
  storageBucket: 'tcl-19-smart-shopping-list-2.appspot.com',
  messagingSenderId: '723873441775',
  appId: '1:723873441775:web:388fe0ff317bf7bc80781a',
};

let fb = firebase.initializeApp(firebaseConfig);

export { fb };
export default firebase;
