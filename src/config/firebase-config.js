// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq3V3wRDlnRlsOBWEHrX8kUzwX_H4tVb8",
  authDomain: "expanse-tracker-108ae.firebaseapp.com",
  projectId: "expanse-tracker-108ae",
  storageBucket: "expanse-tracker-108ae.appspot.com",
  messagingSenderId: "695830596951",
  appId: "1:695830596951:web:b9dadaa761efab6db74212"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const Provider = new GoogleAuthProvider();
export const db = getFirestore(app);
//firebase deploy