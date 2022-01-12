/* eslint-disable no-console */
/* eslint-disable max-len */
// import { signInUser, signInGoogle } from '../Firebase/auth.js';

import { showModal } from './modals.js';

// import { checkIfUserExists } from '../Firebase/firestore.js';

export const errorHandler = (errorM) => {
  const errorCodes = errorM.code;
  if (errorCodes === 'auth/user-not-found') {
    showModal('User not found');
  } else if (errorCodes === 'auth/wrong-password') {
    showModal("Password doesn't match user");
  } else if (errorCodes === 'auth/email-already-in-use') {
    showModal('Email already in use');
  } else if (errorCodes === 'auth/weak-password') {
    showModal('Password should be at least 6 characters');
  } else if (errorCodes === 'auth/missing-email') {
    showModal("You can't leave blank fields");
  }
};

export const checkingUser = (myUser) => {
  if (myUser.emailVerified === true) {
    window.location.hash = '#/timeline';
  } else {
    console.log('no verificado');
    showModal('Your email must be verified, check your email');
  }
};

// export const logInUser = (email, passowrd) => signInUser(email, passowrd).then((userCredential) => {
//   const user = userCredential.user;
//   checkingUser(user);
// }).catch((error) => errorHandler(error));

// export const checkingInputs = (input1, input2, e, input3, box) => {
//   if (input1.value.trim() === '' || input2.value.trim() === '' || input3.value.trim() === '') {
//     e.preventDefault();
//     showModal("You can't leave blank fields");
//   } else if (!box.checked) {
//     e.preventDefault();
//     showModal('You must agree to Terms & Conditions');
//   }
// };

// export const logInWithGoogle = (e) => {
//   e.preventDefault();
//   signInGoogle().then((result) => {
//     const user = result.user;
//     const name = user.displayName || 'New Movielover';
//     const nickname = 'Movielover';
//     const email = user.email;
//     const photo = user.photoURL ? user.photoURL : './img/profileDefault.png';
//     const aboutMe = "I'm a movielover";
//     const movie = 'My favorite movies is ...';
//     const city = 'I live in ...';
//     const interests = 'I like ...';
//     const uid = user.uid;
//     checkIfUserExists(uid, name, nickname, email, photo, aboutMe, movie, city, interests);
//   }).catch((error) => {
//     console.log(error.code);
//   });
// };
