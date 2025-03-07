

// src/firebase/config.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAUm_GXAYPa3_b3N7z5g5nABTdpvjhQYm8",
    authDomain: "proyectocuponera-857c6.firebaseapp.com",
    projectId: "proyectocuponera-857c6",
    storageBucket: "proyectocuponera-857c6.firebasestorage.app",
    messagingSenderId: "856471415068",
    appId: "1:856471415068:web:c24b1eb3c6456bfcba72d9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);