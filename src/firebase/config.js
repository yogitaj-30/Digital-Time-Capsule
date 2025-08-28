import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBwdxIgJhPd97YG2QH47kfcpCYBOx2h83Y",
    authDomain: "digital-capsule-48e78.firebaseapp.com",
    projectId: "digital-capsule-48e78",
    storageBucket: "digital-capsule-48e78.firebasestorage.app",
    messagingSenderId: "121554803279",
    appId: "1:121554803279:web:ff9224eae959c1306ca83a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);