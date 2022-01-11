/* eslint-disable no-console */
import { signOutUser, userState } from '../Firebase/auth.js';
import { getUserInfoProfile } from '../Firebase/firestore.js';

export default () => {
  const viewnavBar = ` <header class = "header">
<div class = "lightContainer">
<div class ="containerShowMoviesPosters">
</div>
  <div class="head">
    <a href= '#/timeline'>MOVIETALK</a>
  </div>
  <ul class="navList">
      <div class="profileLink">
      <i class="fa fa-user fa-lg" aria-hidden="true" id="profileIcon"></i>
        <li class ="userNameNavBar"></li>
      </div>
      <div class ="movieIconnavBar">
        <i class="fa fa-film fa-lg" aria-hidden="true" id="btnCheckoutMovies"></i>
      </div>
      <div class="navBarIcons">
        <li>
          <a href= '#/timeline'>Home</a>
          <i class="fa fa-home fa-lg" aria-hidden="true" id="goHome"></i>
        </li>
        <li id="btnSignOut">
          <a>Sign out</a>
          <i class="fa fa-sign-out fa-lg" aria-hidden="true" ></i>
        </li>
      </div>
  </ul>
  </div>
</header>
  
`;
  const navBar = document.createElement('section');
  navBar.classList.add('containerTimeLine');
  navBar.innerHTML = viewnavBar;

  /* ---------------------------Movie-Section--------------------------------- */

  const btnCheckoutMovies = navBar.querySelector('#btnCheckoutMovies');

  btnCheckoutMovies.addEventListener('click', () => {
    window.location.hash = '#/moviesList';
  });
  /* ---------------------------HomeIcon---------------------------------- */

  const goHome = navBar.querySelector('#goHome');

  goHome.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/timeline';
  });

  /* ---------------------------SignOut-------------------------------------- */
  const btnSignOut = navBar.querySelector('#btnSignOut');
  const userNameNavBar = navBar.querySelector('.userNameNavBar');
  const profileIcon = navBar.querySelector('#profileIcon');

  profileIcon.addEventListener('click', () => {
    window.location.hash = '#/userProfile';
  });
  userNameNavBar.addEventListener('click', () => {
    window.location.hash = '#/userProfile';
  });
  btnSignOut.addEventListener('click', (e) => {
    e.preventDefault();
    signOutUser().then(() => {
      // Sign-out successful.
      window.location.hash = '#/';
    }).catch((error) => { console.log(error); });
  });

  userState((user) => {
    if (user) {
      const uid = user.uid;
      getUserInfoProfile(uid).then((docSnap) => {
        userNameNavBar.textContent = docSnap.data().name;
      });
    }
  });
  return navBar;
};
