import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDgJsswf-3F-ag22DbwJ8fRLaYKKYgY9aE",
    authDomain: "jrnli-onboarding.firebaseapp.com",
    projectId: "jrnli-onboarding",
    storageBucket: "jrnli-onboarding.firebasestorage.app",
    messagingSenderId: "488883682532",
    appId: "1:488883682532:web:1d426e58c2ca6e56fac0f1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
