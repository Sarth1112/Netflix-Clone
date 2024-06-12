import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC92NuPU9lVdeOg8SPthHsYy1v2NZDbQhw",
  authDomain: "netflix-clone-f2348.firebaseapp.com",
  projectId: "netflix-clone-f2348",
  storageBucket: "netflix-clone-f2348.appspot.com",
  messagingSenderId: "372586429904",
  appId: "1:372586429904:web:3cf472331dcfed41850dd5",
  measurementId: "G-7E0LR9B7KL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const formatErrorMessage = (message) => {
    return message.split('/')[1].split(').')[0].split('-').join(' ');
  };

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    toast.error(formatErrorMessage(error.message)); // Ensure error.message is passed
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(formatErrorMessage(error.message)); // Ensure error.message is passed
  }
}

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.message); // Ensure error.message is passed
  }
}

export { auth, db, login, signup, logout };
