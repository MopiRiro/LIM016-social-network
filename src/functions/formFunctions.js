/* eslint-disable no-console */
/* eslint-disable max-len */
// import { signInUser, signInGoogle } from '../Firebase/auth.js';

import { showModal } from './modals.js';

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
    showModal('Your email must be verified, check your email');
  }
};
