/* eslint-disable no-console */
import { signOutUser, userState } from '../lib/auth.js';

export default () => {
  const viewnavBar = ` <header class = "header">
<div class = "lightContainer">
<div class ="containerShowMoviesPosters">
</div>
  <div class="head">
    <a>MOVIETALK</a>
  </div>
  <ul class="navList">
      <div class="profileLink">
        <div class="profilePicture">
        </div>
        <li class ="userNameNavBar"></li>
      </div>
      <div class ="movieIconnavBar">
     <img src ="./img/video-camera.png" class ="movieIcon" id="btnCheckoutMovies"> 
      </div>
      <div class="navBarIcons">
        <li>
          <a href="">Search</a>
          <i class="fa fa-hashtag fa-lg" aria-hidden="true" ></i>
        </li>
        <li id="btnSignOut">
          <a>Sign out</a>
          <i class="fa fa-sign-out fa-lg" aria-hidden="true" ></i>
        </li>
      </div>
  </ul>
  </div>
</header>
  <section class ="movieSection">
      <i class="fas fa-chevron-left" id = "closeMovieSection"></i>
      <div class = "moviePosters">
        <div class ="titleAndPoster">
          <div class =" poster">
            <img src ="./img/spiderman.jpg" class ="movieImg">
          </div>
          <div class ="titleWatch">
            <p> SPIDERMAN: NO WAY HOME</p>
            <div class ="whereTowatch">
            <img src="https://img.icons8.com/nolan/64/ticket.png"/ class ="centerIcon">
            </div>
          </div>
        </div>
        <div class ="titleAndPoster">
          <div class =" poster">
            <img src ="./img/dontlookup.jpg" class ="movieImg">
          </div>
          <div class ="titleWatch">
            <p> DON'T LOOK UP</p>
            <div class ="whereTowatch">
              <img src="https://img.icons8.com/nolan/50/netflix.png"/ class ="centerIcon bigImg">
            </div>
          </div>
        </div>
        <div class ="titleAndPoster">
          <div class =" poster">
            <img src ="./img/shangchi.jpg" class ="movieImg">
          </div>
          <div class ="titleWatch">
            <p> SHANG-CHI AND THE LEGEND OF THE 10 RINGS</p>
            <div class ="whereTowatch">
            <img src="https://img.icons8.com/nolan/50/disney-plus.png"/ class ="centerIcon">
            </div>
          </div>
        </div>
        <div class ="titleAndPoster">
          <div class =" poster">
            <img src ="./img/grinch.jpg" class ="movieImg">
          </div>
          <div class ="titleWatch">
            <p> THE GRINCH</p>
            <div class ="whereTowatch">
              <img src="https://img.icons8.com/nolan/50/amazon-prime-video.png"/>
              <img src="https://img.icons8.com/nolan/50/google-play.png"/>
            </div>
          </div>
        </div>
        <div class ="titleAndPoster">
          <div class =" poster">
            <img src ="./img/joker.jpg" class ="movieImg">
          </div>
          <div class ="titleWatch">
            <p> THE JOKER</p>
            <div class ="whereTowatch">
            <img src="https://img.icons8.com/nolan/50/hbo.png"/ class ="centerIcon">
            </div>
          </div>
        </div>
      </div>
  </section>
`;
  const navBar = document.createElement('section');
  navBar.classList.add('containerTimeLine');
  navBar.innerHTML = viewnavBar;

  /* ---------------------------Movie-Section--------------------------------- */

  const btnCheckoutMovies = navBar.querySelector('#btnCheckoutMovies');
  const movieSection = navBar.querySelector('.movieSection');
  const closeMovieSection = navBar.querySelector('#closeMovieSection');
  btnCheckoutMovies.addEventListener('click', () => {
    console.log('click');
    movieSection.classList.toggle('showIt');
  });
  closeMovieSection.addEventListener('click', () => {
    movieSection.classList.remove('showIt');
  });

  /* ---------------------------SignOut-------------------------------------- */
  const btnSignOut = navBar.querySelector('#btnSignOut');
  const userNameNavBar = navBar.querySelector('.userNameNavBar');
  const profilePictureNavMobile = navBar.querySelector('.profilePicture');
  btnSignOut.addEventListener('click', (e) => {
    e.preventDefault();
    signOutUser().then(() => {
      // Sign-out successful.
      window.location.hash = '#/';
    }).catch((error) => { console.log(error); });
  });
  userState((user) => {
    if (user) {
    // const uid = user.uid;
    // window.location.hash = '#/timeline';
      const userName = user.displayName;
      const newUserName = userName || 'New User';
      const userPhoto = user.photoURL ? user.photoURL : './img/profileDefault.png';
      // console.log(user);
      userNameNavBar.textContent = newUserName;

      profilePictureNavMobile.innerHTML = `
      <img src="${userPhoto}" alt="userPhoto" class="userPhotoNav">
     `;
      profilePictureNavMobile.addEventListener('click', () => {
        window.location.hash = '#/userProfile';
      });
    }
  });
  return navBar;
};
