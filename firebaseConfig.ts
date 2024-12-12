import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {getAuth} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBa4pB85pTBMTRvMh9EEcMSHml_e68Ozmo",
    authDomain: "flappy-bird-6add9.firebaseapp.com",
    projectId: "flappy-bird-6add9",
    storageBucket: "flappy-bird-6add9.appspot.com",
    messagingSenderId: "703033059722",
    appId: "1:703033059722:web:8fe53500d96219214bc073",
    measurementId: "G-KRF9H1SM6G"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
//export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
