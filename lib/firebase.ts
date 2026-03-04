import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCr0ZLUV2bU-WIh0Pu_Aj06c7GpcwEAwgs",
    authDomain: "oruzen-auth.firebaseapp.com",
    projectId: "oruzen-auth",
    storageBucket: "oruzen-auth.firebasestorage.app",
    messagingSenderId: "869143475073",
    appId: "1:869143475073:web:bb0102e833a3c6bb062e80"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
