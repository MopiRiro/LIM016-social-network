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
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCkEJklzntAxT2mXbwjDRl3d8aMSZXVlWo',
  authDomain: 'socialnetwork-a77f4.firebaseapp.com',
  projectId: 'socialnetwork-a77f4',
  storageBucket: 'socialnetwork-a77f4.appspot.com',
  messagingSenderId: '207962313349',
  appId: '1:207962313349:web:6193488f70cb5be00d0fec',
  // eslint-disable-next-line no-template-curly-in-string
  measurementId: '${config.measurementId}',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider(app);

export {
  app,
  auth,
  provider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
};
