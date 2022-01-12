/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// import { TestWatcher } from 'jest';
import {
  signInUser, signInGoogle, signUpUser, signOutUser, sendPassword, userState, verificationEmail,
} from '../../src/Firebase/auth.js';

import {
  checkingUser, 
  errorHandler,
} from '../../src/functions/formFunctions.js';

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendEmailVerification,
} from '../../src/Firebase/config.js';

jest.mock('../../src/Firebase/config.js');

describe('signInUser', () => {
  it('ingresa un coreo y contraseña de un usuario ya creado', () => {
    signInUser('natalia@gmail.com', 'password', checkingUser, errorHandler).then(() => {
      expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('natalia@gmail.com');
      expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('password');
      expect(typeOf checkingUser).toBe('function');
      expect(typeOf errorHandler).toBe('function');
    }).catch((err) => console.log(err.message));
  });
});

// describe('signInGoogle', () => {
//   it('ingresa al usuario al hacer click', () => {
//     signInGoogle().then(() => {
//       expect(signInWithPopup.mock.calls).toHaveLength(1);
//     }).catch((err) => console.log(err.message));
//   });
// });

describe('signUpUser', () => {
  it('crea un nuevo usuario con correo y contraseña', () => {
    signUpUser('natalia@gmail.com', 'password').then(() => {
      expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('natalia@gmail.com');
      expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('password');
    }).catch((err) => console.log(err.message));
  });
});

describe('signOutUser', () => {
  it('saca de sesión al usuario', () => {
    signOutUser().then(() => {
      expect(signOut.mock.calls).toHaveLength(1);
    }).catch((err) => console.log(err.message));
  });
});

describe('sendPassword', () => {
  it('envia un correo si el usuario se olvido su contraseña', () => {
    sendPassword('natalia@gmail.com').then(() => {
      expect(sendPasswordResetEmail.mock.calls[0][1]).toBe('natalia@gmail.com');
    }).catch((err) => console.log(err.message));
  });
});

describe('userState', () => {
  it('me dice el estado del usuario', () => {
    userState('user').then(() => {
      expect(onAuthStateChanged.mock.calls[0][1]).toBe('user');
    });
  });
});

describe('emailVerification', () => {
  it('me manda un email de verificación', () => {
    verificationEmail().then(() => {
      expect(sendEmailVerification.mock.calls).toHaveLength(1);
    }).catch((err) => console.log(err.message));
  });
});
