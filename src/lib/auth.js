/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import {
  auth,
  provider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from '../config.js';

export function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export const signInGoogle = () => {
  return signInWithPopup(auth, provider);
};

export function signUpUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  return signOut(auth);
}

export function sendPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function userState(user) {
  return onAuthStateChanged(auth, (user));
}
