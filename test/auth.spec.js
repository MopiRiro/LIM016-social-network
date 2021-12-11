import sectionView from '../src/view/signin.js';
import { signInWithEmailAndPassword /* signInWithPopup */ } from '../src/firebase/config.js';

jest.mock('../src/firebase/config.js');

describe('sectionView', () => {
  it('Al enviar el usuario se logea', () => {
    const signInEx = sectionView();
    signInEx.querySelector('#inputUserEmail').value = 'nataliaejemplo@gmail.com';
    signInEx.querySelector('#inputUserPassword').value = '123466';
    const btn = signInEx.querySelector('.formSignIn');
    const event = new Event('submit');
    btn.dispatchEvent(event);
    expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('nataliaejemplo@gmail.com');
    expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('123466');
  });
});
