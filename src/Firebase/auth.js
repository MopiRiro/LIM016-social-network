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

export const signInUser = (email, password, checkEmail, errorFunction) => signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
  const user = userCredential.user;
  checkEmail(user);
}).catch((error) => errorFunction(error));

export const signUpUser = (email, password, inputUserName, createUserColl, errFunc) => createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
  const user = userCredential.user;
  const nickname = 'Movielover';
  const photo = user.photoURL ? user.photoURL : './img/profileDefault.png';
  const aboutMe = "I'm a movielover";
  const movie = 'My favorite movies is ...';
  const city = 'I live in ...';
  const interests = 'I like ...';
  const uid = user.uid;
  createUserColl(uid, inputUserName, nickname, email, photo, aboutMe, movie, city, interests);
}).catch((error) => errFunc(error));

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
