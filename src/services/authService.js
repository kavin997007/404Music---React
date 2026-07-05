import {
  auth,
  googleProvider,
} from "../firebase/firebase";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signup = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const googleLogin = () =>
  signInWithPopup(auth, googleProvider);

export const logout = () =>
  signOut(auth);