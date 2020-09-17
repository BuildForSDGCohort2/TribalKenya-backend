import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCQc0KombCHi0hZBKSF0vT_ZhWV1BiOoKo',
  authDomain: 'tribalkenya-ff470.firebaseapp.com',
  databaseURL: 'https://tribalkenya-ff470.firebaseio.com',
  projectId: 'tribalkenya-ff470',
  storageBucket: 'tribalkenya-ff470.appspot.com',
  messagingSenderId: '812549061912',
  appId: '1:812549061912:web:a2fd9c25d99b4ebef7f26d',
  measurementId: 'G-L2VF3SHGJ0'
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const storageRef = firebase.storage().ref();

export const firebaseAuth = firebase.auth();
export const users = db.collection('users');
