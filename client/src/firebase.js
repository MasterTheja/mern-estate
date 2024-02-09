// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-eee3a.firebaseapp.com",
  projectId: "mern-estate-eee3a",
  storageBucket: "mern-estate-eee3a.appspot.com",
  messagingSenderId: "169651162482",
  appId: "1:169651162482:web:34177e2510f06caa8de1eb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);