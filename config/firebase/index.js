import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBaEp1SHbqTOjjRCQ4kM3p91t3Ok8oT78w',
  authDomain: 'visit-me-f8404.firebaseapp.com',
  databaseURL: 'https://visit-me-f8404.firebaseio.com',
  projectId: 'visit-me-f8404',
  storageBucket: 'visit-me-f8404.appspot.com',
  messagingSenderId: '339918783277',
  appId: '1:339918783277:web:fb20b632b0bd11405109a4',
  measurementId: 'G-W9H7NY9GHH',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
