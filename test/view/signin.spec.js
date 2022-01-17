import SignIn from '../../src/view/signin.js';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from '../../src/Firebase/config.js';

import {
  showModal,
} from '../../src/functions/modals.js';

import {
  checkingUser,
  errorHandler,
} from '../../src/functions/formFunctions.js';

import { checkIfUserExists } from '../../src/Firebase/firestore.js';

jest.mock('../../src/Firebase/config.js');

describe('SignIn', () => {
  it('Logea un usuario con correo verificado', () => {
    const signInView = SignIn();
    signInView.querySelector('#inputUserEmail').value = 'riveraromeromonicadelpilar@gmail.com';
    signInView.querySelector('#inputUserPassword').value = '123456';
    const formSignIn = signInView.querySelector('.formSignIn');
    const evtSignIn = new Event('submit');
    formSignIn.dispatchEvent(evtSignIn);
    expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('riveraromeromonicadelpilar@gmail.com');
    expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('123456');
    expect(typeof checkingUser).toBe('function');
    expect(typeof errorHandler).toBe('function');
    expect(typeof showModal).toBe('function');
  });
});

describe('SignIn with google', () => {
  it('Logea con cuenta de Google', () => {
    const signInView = SignIn();
    const btnSignInWithGoogle = signInView.querySelector('.btnSocialNetworks');
    const evtSignInWithGoogle = new Event('click');
    btnSignInWithGoogle.dispatchEvent(evtSignInWithGoogle);
    expect(signInWithPopup.mock.calls).toHaveLength(1);
    expect(typeof checkIfUserExists).toBe('function');
  });
});
