import SignIn from '../../src/view/signin.js';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from '../../src/Firebase/config.js';

import {
  showModal,
} from '../../src/functions/modals.js';

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
    // console.log(signInWithEmailAndPassword.mock.calls);
  });
});

describe('SignIn with google', () => {
  it('Logea con cuenta de Google', () => {
    const signInView = SignIn();
    const btnSignInWithGoogle = signInView.querySelector('.btnSocialNetworks');
    const evtSignInWithGoogle = new Event('click');
    btnSignInWithGoogle.dispatchEvent(evtSignInWithGoogle);
    const id = 'tfUagr1e3ghFbBdv4d2DkNnxpfP2';
    signInWithPopup.mock.results[0].value.then((data) => {
    //   expect(data.user.uid).toBe(id);
    // problemas con id 
      expect(data).toStrictEqual({ user: { uid: id } });
    });
  });
});
