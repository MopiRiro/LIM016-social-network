import SignUp from '../../src/view/signup.js';

import {
  errorHandler,
  checkingUser,
} from '../../src/functions/formFunctions.js';

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from '../../src/Firebase/config.js';

import { checkIfUserExists } from '../../src/Firebase/firestore.js';

jest.mock('../../src/Firebase/config.js');

describe('SignIn', () => {
  it('Logea un usuario con correo verificado', () => {
    document.body.innerHTML = `
    <div id="modal"></div>
    `;
    const signUpView = SignUp();
    signUpView.querySelector('#inputUserEmail').value = 'riveraromeromonicadelpilar@gmail.com';
    signUpView.querySelector('#inputUserPassword').value = '123456';
    signUpView.querySelector('#inputUserName').value = 'Pili';
    const formSignUp = signUpView.querySelector('.signUpForm');
    const evtSignUp = new Event('submit');
    formSignUp.dispatchEvent(evtSignUp);
    // expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('riveraromeromonicadelpilar@gmail.com');
    // expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('123456');
    // expect(typeof checkingUser).toBe('function');
    // expect(typeof errorHandler).toBe('function');
    // // expect(showModal).toBe('function');
    // expect(sendEmailVerification.mock.calls[0][1]).toBe('riveraromeromonicadelpilar@gmail.com');
    console.log(createUserWithEmailAndPassword.mock.calls);
    console.log(sendEmailVerification.mock);
  });
});

describe('SignIn with google', () => {
  it('Logea con cuenta de Google', () => {
    const signInView = SignUp();
    const btnSignInWithGoogle = signInView.querySelector('.btnSocialNetworks');
    const evtSignInWithGoogle = new Event('click');
    btnSignInWithGoogle.dispatchEvent(evtSignInWithGoogle);
    expect(signInWithPopup.mock.calls).toHaveLength(1);
    expect(typeof checkIfUserExists).toBe('function');
  });
});
