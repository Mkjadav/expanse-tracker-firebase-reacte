// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-1o_f-tfI8Ltvk4ZYYOqt4-fjIcaqO1I",
    authDomain: "expanse-tracker-a8db3.firebaseapp.com",
    projectId: "expanse-tracker-a8db3",
    storageBucket: "expanse-tracker-a8db3.appspot.com",
    messagingSenderId: "1010560259692",
    appId: "1:1010560259692:web:d7bdd23ba2c366efa16a49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)



// firebase login
// firebase init
// firebase deploy