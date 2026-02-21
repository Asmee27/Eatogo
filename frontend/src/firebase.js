import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "eatogo-food-delivery.firebaseapp.com",
  projectId: "eatogo-food-delivery",
  storageBucket: "eatogo-food-delivery.firebasestorage.app",
  messagingSenderId: "31933784354",
  appId: "1:31933784354:web:5f81a65d420ecc7e92457b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app,auth};