/* eslint-disable no-console */
import { signOut, auth } from '../firebase/config.js';

export default () => {
  const viewTimeLine = `
  <header class = "header">
    <div class="head">
      <a>MOVIETALK</a>
    </div>
    <ul class="navList">
        <div class="profileLink">
          <div class="profilePicture">
            <input type="text" class="profile">
          </div>
          <li>Fulana Suarez</li>
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
  </header>

    <main class = "containerUserAndOthersPosts">
    <div class="containerUser">
    <div class="backgroundPhoto">
        <img src="./img/fondoPrueba.png" alt="">
    </div>
    <div class="containerAboutUser">
        <div class="profilePictureUser">
            <input type="text" class="profile">
        </div>
        <div class="userInfo">
            <p class="userName">Fulana Suarez</p>
            <p class="userAbout">MovieLover</p>
        </div>
    </div>
</div>

<div class="containerPosts">
    <div class="containerUserPosts">
        <div class="toPost">
            <input type="text" class="toPostInput" placeholder="What do you want to share?">
        </div>
        <div class="uploadAndShare">
            <i class="fa fa-file-image-o circleUpload" aria-hidden="true"></i>
            <button class="shareBtn"> SHARE</button>
        </div>
    </div>
    <div class="containerOthersPosts">
        <div class="othersInfo">
            <p>Jean</p>
            <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="othersToPost">
            <input type="text" class="othersToPostInput" value="Hi"> </input>
        </div>
        <div class="likeAndShare">
            <i class="fa fa-heart circleIcon" aria-hidden="true"></i>
            <i class="fa fa-paper-plane circleIcon" aria-hidden="true"></i>
            <i class="fa fa-pencil circleIcon" aria-hidden="true"></i>
            <i class="fa fa-trash circleIcon" aria-hidden="true"></i>
        </div>
    </div>
</div>
<button id="myBtn" title="Go to top"><i class="fas fa-arrow-up"></i></button>
    </main>
   `;
  const sectionView = document.createElement('section');
  sectionView.classList.add('containerTimeLine');
  sectionView.innerHTML = viewTimeLine;

  // const hideFooter = document.querySelector('.footer');
  // hideFooter.style.display = 'none';

  const btnSignOut = sectionView.querySelector('#btnSignOut');
  btnSignOut.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
    // Sign-out successful.
      window.location.hash = '#/';
    }).catch((error) => {
      console.log(error);
    // An error happened.
    });
  });
  return sectionView;
};
