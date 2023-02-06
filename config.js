// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAicr3mZtQmWxZO4D5JWiF-CW10gYL3RdU",
  authDomain: "integrated-solutions-e5ce9.firebaseapp.com",
  databaseURL: "https://integrated-solutions-e5ce9-default-rtdb.firebaseio.com",
  projectId: "integrated-solutions-e5ce9",
  storageBucket: "integrated-solutions-e5ce9.appspot.com",
  messagingSenderId: "453224084440",
  appId: "1:453224084440:web:edafa9a7e6e51e349e38ad",
  measurementId: "G-NX0349DHS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);