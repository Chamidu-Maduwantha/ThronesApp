// In your App.js or main entry file

import * as firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCjPPYYKnQNVD_FnJidNiSTmKVKQZR5jFg",
    authDomain: "assignment-ec038.firebaseapp.com",
    projectId: "assignment-ec038",
    storageBucket: "assignment-ec038.appspot.com",
    messagingSenderId: "809514338564",
    appId: "1:809514338564:web:8d07b78d623154b6f36851",
    measurementId: "G-3S0MHYE2LZ"
};



const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getDatabase(app);

export {auth, database}