import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = process.env.FIREBASE_CONFIG;

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
