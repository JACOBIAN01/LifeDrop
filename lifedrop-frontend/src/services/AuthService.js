// src/AuthService.js
import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";



// Signup
export const register = async (name,email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const uid = userCredential.user.uid;

  await setDoc(doc(db,"users",uid), {
    name:name,
    email:email,
    createdAt:new Date(),
  })
  
};


// Login
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = () => {
  return signOut(auth);
};
