// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "user-management-redux.firebaseapp.com",
  projectId: "user-management-redux",
  storageBucket: "user-management-redux.appspot.com",
  messagingSenderId: "945957667682",
  appId: "1:945957667682:web:5fe799a8a588eb6846223b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);