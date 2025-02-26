// Firebase ka setup
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZox4OY34NPLbjO2wXJekWuuubFoZJeOg",
  authDomain: "task-manager-96e85.firebaseapp.com",
  projectId: "task-manager-96e85",
  storageBucket: "task-manager-96e85.firebasestorage.app",
  messagingSenderId: "151430164211",
  appId: "1:151430164211:web:202b28f42623a9d0c11186",
  measurementId: "G-R9QQ8VC1ZS"
};

// Firebase initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider(); // ✅ Google Provider Initialize


export { auth, db, googleProvider };
