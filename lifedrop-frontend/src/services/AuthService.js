import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc,getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

//Get Current User
export const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return user;
};

//Get Current User Details
export const useCurrentUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const user = useCurrentUser();

  useEffect(() => {
    if (!user) {
      return;
    }
    const getDetails = async () => {
      try {
        const userDoc = doc(db,"users",user.uid)
        const userSnap = await getDoc(userDoc)
        if (!userSnap.exists()) {
          console.log("No such user!");
          setUserDetails(null);
        } else {
          setUserDetails(userSnap.data()); 
        }
      } catch (err) {
        console.log(err);
      }
    };
    getDetails();
  }, [user]);
  return userDetails;
};

//Sign Up
export const register = async (name, userType = "user", email, password) => {
  try {
    // Create user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update profile
    await updateProfile(user, { displayName: name, userType: userType });

    // Save to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      userType,
      email,
      createdAt: new Date(),
    });
    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

//LogIN
export const login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

//LogOut
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
