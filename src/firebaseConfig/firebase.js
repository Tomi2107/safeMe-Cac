// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import 'firebase/auth'
import "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdExkGNU2yH-TyxUXG2H4Wb4eukDbq9ss",
  authDomain: "safe-me-5741c.firebaseapp.com",
  projectId: "safe-me-5741c",
  storageBucket: "safe-me-5741c.appspot.com",
  messagingSenderId: "499726956853",
  appId: "1:499726956853:web:c233ae17f47f7f474af47c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
