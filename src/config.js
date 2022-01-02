/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendEmailVerification,
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

import {
  getFirestore,
  doc,
  getDocs,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDSBFTrk4G7GgKk1MNG1Wp6CjE-X85GYyI',
  authDomain: 'movie-e-43a8f.firebaseapp.com',
  projectId: 'movie-e-43a8f',
  storageBucket: 'movie-e-43a8f.appspot.com',
  messagingSenderId: '563741490977',
  appId: '1:563741490977:web:3a6f2b40a7deb1156f4860',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider(app);

const user = auth.currentUser;

export {
  user,
  app,
  auth,
  provider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendEmailVerification,
};

//  FireStore

const db = getFirestore(app);
export {
  db,
  getFirestore,
  doc,
  getDocs,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
};
