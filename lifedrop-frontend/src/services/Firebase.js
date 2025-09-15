
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore} from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging"


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
export const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);



// ✅ Request notification token (with service worker)
export const requestForToken = async () => {
  console.log("Requesting FCM token...");
  try {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    const token = await getToken(messaging, {
      vapidKey:
        "BJ8McGZ9wS3hkoxDsnGs8EZNaru02ayCivI4BP6cQxAPKmTKHVokw7WFzjJJ-uyNOmO0nJw0yFBw0KMbCNU9EAk", // set in .env
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("✅ Current FCM Token:", token);
      return token;
    } else {
      console.warn("⚠️ No registration token available. Ask user permission.");
      return null;
    }
  } catch (err) {
    console.error("❌ Error getting FCM token:", err);
    return null;
  }
};

// ✅ Foreground message listener
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("📩 Foreground message:", payload);
      resolve(payload);
    });
  });