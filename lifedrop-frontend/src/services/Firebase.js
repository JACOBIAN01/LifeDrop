
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBZ5ugMPiQAqcoJgYznEl9J2AsD9EZu0hU",
  authDomain: "lifedrop-75421.firebaseapp.com",
  projectId: "lifedrop-75421",
  storageBucket: "lifedrop-75421.firebasestorage.app",
  messagingSenderId: "1086651299246",
  appId: "1:1086651299246:web:804e53b0833b7667fbc43f",
  measurementId: "G-1R63BE41GH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
