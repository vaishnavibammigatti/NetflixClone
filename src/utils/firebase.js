// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgPijG6b6SocyNAhVK1n6qok6Y07HRW3w",
  authDomain: "netflixgpt-946fb.firebaseapp.com",
  projectId: "netflixgpt-946fb",
  storageBucket: "netflixgpt-946fb.firebasestorage.app",
  messagingSenderId: "533602843422",
  appId: "1:533602843422:web:cf5025e78d04e9a199270f",
  measurementId: "G-YSZEEQJC10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
