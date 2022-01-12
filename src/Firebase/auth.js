/* eslint-disable max-len */
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
  sendEmailVerification,
} from './config.js';

// export function signInUser(email, password) {
//   return signInWithEmailAndPassword(auth, email, password);
// }

export const signInUser = (email, password, function1, function2) => signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
  const user = userCredential.user;
  function1(user);
}).catch((error) => function2(error));

// export const signInGoogle = () => {
//   return signInWithPopup(auth, provider);
// };

export const signInGoogle = (e, checkIfCollExists) => {
  e.preventDefault();
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    const name = user.displayName || 'New Movielover';
    const nickname = 'Movielover';
    const email = user.email;
    const photo = user.photoURL ? user.photoURL : './img/profileDefault.png';
    const aboutMe = "I'm a movielover";
    const movie = 'My favorite movies is ...';
    const city = 'I live in ...';
    const interests = 'I like ...';
    const uid = user.uid;
    checkIfCollExists(uid, name, nickname, email, photo, aboutMe, movie, city, interests);
  }).catch((error) => {
    console.log(error.code);
  });
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

export function verificationEmail() {
  return sendEmailVerification(auth.currentUser);
}
