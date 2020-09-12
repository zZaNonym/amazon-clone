import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDLTYU4VyzL2HSKqHbzI0qPWV1U0R02Cfw',
  authDomain: 'zoom-clone-2cf9b.firebaseapp.com',
  databaseURL: 'https://zoom-clone-2cf9b.firebaseio.com',
  projectId: 'zoom-clone-2cf9b',
  storageBucket: 'zoom-clone-2cf9b.appspot.com',
  messagingSenderId: '985521309351',
  appId: '1:985521309351:web:253d9f6a475a80cb3a3d82',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
