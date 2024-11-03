// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Analytics, getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Debug environment variables
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    console.error('Firebase API key is missing!');
}

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics | null = null;

// Initialize Firebase based on environment
if (typeof window === 'undefined') {
    // Server-side initialization
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApps()[0];
    }
} else {
    // Client-side initialization
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
        try {
            analytics = getAnalytics(app);
        } catch (error) {
            console.error('Analytics initialization error:', error);
        }
    } else {
        app = getApps()[0];
    }
}

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export { analytics };
export default app;
