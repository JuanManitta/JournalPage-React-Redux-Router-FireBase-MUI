
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDLgdTKq2O-nBBudEpnfDdujfCdXkm4LSY",
  authDomain: "react-journalapp-1a51e.firebaseapp.com",
  projectId: "react-journalapp-1a51e",
  storageBucket: "react-journalapp-1a51e.appspot.com",
  messagingSenderId: "1099310439325",
  appId: "1:1099310439325:web:a113a0bc7e9660854bad74"
};


export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
