import { changeViews } from './view-controller/router.js';

const init = () => {
  changeViews(window.location.hash);
  window.addEventListener('hashchange', () =>
    // eslint-disable-next-line comma-dangle
    // eslint-disable-next-line implicit-arrow-linebreak
    changeViews(window.location.hash));
};

window.addEventListener('load', init);
