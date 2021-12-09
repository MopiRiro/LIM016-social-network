/* eslint-disable import/no-unresolved */
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

import { app } from './config.js';

const auth = getAuth(app);

export function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export const signInGoogle = () => {
  const provider = new GoogleAuthProvider(auth);
  return signInWithPopup(auth, provider);
};

export function signUpUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
