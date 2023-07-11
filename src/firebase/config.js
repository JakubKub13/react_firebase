import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBiNymlRkq-S6hoXxyR0UmNY67emTTkAqI",
    authDomain: "movies-project-1b1d5.firebaseapp.com",
    projectId: "movies-project-1b1d5",
    storageBucket: "movies-project-1b1d5.appspot.com",
    messagingSenderId: "776534495754",
    appId: "1:776534495754:web:757c4d8bd569803db1c5f3"
  };

  // initial settings of firebase
firebase.initializeApp(firebaseConfig);

// initial settings of services
const projectFirestore = firebase.firestore();

export { projectFirestore };