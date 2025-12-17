// Firebase Configuration for BOKRA Landing Page
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4Al3NrIukhjRkPnbapMpDmTUk4gzqBbc",
  authDomain: "bokra-44bc4.firebaseapp.com",
  databaseURL: "https://bokra-44bc4-default-rtdb.firebaseio.com",
  projectId: "bokra-44bc4",
  storageBucket: "bokra-44bc4.firebasestorage.app",
  messagingSenderId: "387860985016",
  appId: "1:387860985016:web:21e92a19758425bcf1304d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };

