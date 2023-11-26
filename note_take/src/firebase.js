// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTZBysW9gCwi4488UnQ70sxyz0riGxWPA",
  authDomain: "new-todo-9301f.firebaseapp.com",
  databaseURL: "https://new-todo-9301f-default-rtdb.firebaseio.com",
  projectId: "new-todo-9301f",
  storageBucket: "new-todo-9301f.appspot.com",
  messagingSenderId: "16824405032",
  appId: "1:16824405032:web:1c4d40241b844f0462b91d",
  measurementId: "G-B5VW0390W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();