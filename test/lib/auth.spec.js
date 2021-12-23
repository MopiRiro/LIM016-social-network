/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// import { TestWatcher } from 'jest';
import { signInUser } from '../../src/lib/auth.js';
import signIn from '../../src/view/signin.js';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
// global.document
jest.mock('../../src/config.js');
// console.log(dom.window.document.querySelector('p').textContent);

describe('signIn', () => {
  const windo = new JSDOM();

  beforeAll((done) => {
    jsdom.fromFile('../../src/index.html', {
      runScripts: 'dangerously',
      resources: 'usable',
      windo,
    })
      .then((dom) => {
        global.document = dom.window.document;
        done();
      });
  });

  it('verifica el dom', () => {
    expect(document).not.toBe(undefined);
  });
  it('find SignIn', () => {
    const sectionSignIn = signIn();
    const form = sectionSignIn.querySelector('.formSignIn');
    const email = sectionSignIn.querySelector('#inputUserEmail');
    const password = sectionSignIn.querySelector('#inputUserPassword');
    expect(sectionSignIn).not.toBe(undefined);
    expect(form).not.toBe(undefined);
    expect(email).toBe('string');
    expect(password).toBe('string');
  });
});
