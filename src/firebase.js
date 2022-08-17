// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJNlIG0l-P7rIe7GqooTyeJg2jF2oyv4U",
  authDomain: "fir-challenge-43c34.firebaseapp.com",
  projectId: "fir-challenge-43c34",
  storageBucket: "fir-challenge-43c34.appspot.com",
  messagingSenderId: "844245404730",
  appId: "1:844245404730:web:99c4847bc2803f5609f903",
  measurementId: "G-LECN5JCP1G"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

