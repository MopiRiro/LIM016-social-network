import SignIn from '../../src/view/signin.js';
import {
  signInWithEmailAndPassword,
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
