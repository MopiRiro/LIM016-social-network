/* eslint-disable no-console */
import { changeViews } from './view-controller/router.js';

const init = () => {
  changeViews(window.location.hash);
  window.addEventListener('hashchange', () =>
    // eslint-disable-next-line comma-dangle
    // eslint-disable-next-line implicit-arrow-linebreak
    changeViews(window.location.hash));
};

window.addEventListener('load', init);
// Get the button:
const mybutton = document.getElementById('myBtn');
window.onscroll = () => {
  // eslint-disable-next-line no-use-before-define
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
mybutton.onclick = function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
