import { changeViews } from './view-controller/router.js';
import { signOutUser } from './firebase/auth.js';

const init = () => {
  changeViews(window.location.hash);
  window.addEventListener('hashchange', () =>
    // eslint-disable-next-line comma-dangle
    // eslint-disable-next-line implicit-arrow-linebreak
    changeViews(window.location.hash));
};

window.addEventListener('load', init);

const btnSignOut = document.getElementById('btnSignOut');
btnSignOut.addEventListener('click', (e) => {
  e.preventDefault();
  signOutUser().then(() => {
    // Sign-out successful.
    window.location.hash = '#/';
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
});
