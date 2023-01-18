// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "ecommerce-f34db.firebaseapp.com",
  projectId: "ecommerce-f34db",
  storageBucket: "ecommerce-f34db.appspot.com",
  messagingSenderId: "593378922362",
  appId: "1:593378922362:web:da9b4b1169710e349ad0c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app) //database
export const storage = getStorage(app)
export default app