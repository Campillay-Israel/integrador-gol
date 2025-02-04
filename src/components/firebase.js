// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCgrumJTQ9imkN_R-LPsYn4cYV2dt8IgkM",
  authDomain: "gol-app-6eddc.firebaseapp.com",
  projectId: "gol-app-6eddc",
  storageBucket: "gol-app-6eddc.firebasestorage.app",
  messagingSenderId: "33081238433",
  appId: "1:33081238433:web:978e74a04b80850e37a1e0",
  measurementId: "G-RRHK8NFGEW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };