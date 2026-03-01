// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYKBZTPedzi7Q1zaS_cxUaCYFg0ZZ7K88",
  authDomain: "mln131-47048.firebaseapp.com",
  projectId: "mln131-47048",
  storageBucket: "mln131-47048.firebasestorage.app",
  messagingSenderId: "59767913025",
  appId: "1:59767913025:web:240cfedfd865fc874524c0",
  measurementId: "G-RBXX1PM4PY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
