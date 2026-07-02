import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Required .env variables:
// VITE_FIREBASE_API_KEY=
// VITE_FIREBASE_AUTH_DOMAIN=
// VITE_FIREBASE_PROJECT_ID=
// VITE_FIREBASE_APP_ID=

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app = null;

if (firebaseConfig.apiKey) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    console.warn("Firebase initialization error:", error);
  }
} else {
  console.warn("Firebase API Key is missing. Running without Firebase.");
}

export const auth = app ? getAuth(app) : null;
export const googleProvider = new GoogleAuthProvider();
