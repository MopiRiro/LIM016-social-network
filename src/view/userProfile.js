/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { userState } from '../lib/auth.js';
import {
  createUserInfoProfile,
  updateUserInfoProfile,
  getUserInfoProfile,
  getUserInfoProfileNow,
  deletePost,
  deleteUserInfoProfile,
} from '../lib/firestore.js';
import { showModal } from '../functions/modals.js';

export default () => {
  const profileView = `
    <div class = "containerArrow">
        <i class="fas fa-chevron-left"></i>
    </div>
    <main>
    <section class ="containerMainUserProfile">
      <section class = "containerUserProfile">
        <p>Name User</p>
        <img src='./img/profileDefault.png'>
        <button class ="btnEditProfile
        ">Edit profile</button>
      </section>
      <section class = "containerUserProfileAboutMe">
        <div class = "containerProfilePhoto">
          <div class = "containerEditPhoto">
            <p>Profile photo</p>
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </div>
          <div class = "containerPhoto">
          <img class = "userPhoto" src='./img/profileDefault.png'>
          </div>
          <button class ="btnEditProfile 
          " id ="btnEditProfile">Edit Profile</button>
        </div>
        <div class = "containerEditUserProfile">
          <form id= "form">
            <div class = "containerAboutMe">
            <div class = "containerEditUserInfo">
              <p>About me</p>
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </div>
            <input type = "text" class = "inputAboutMe" id="inputAboutMe">
          </div>
          <div class = "containerDetails">
            <div class = "containerChildDetails">
              <p>Name: </p>
              <input type = "text" class = "inputDetail" id="inputName">
            </div>
            <div class = "containerChildDetails">
              <p>Favorite movie: </p>
              <input type = "text" class = "inputDetail" id="inputFavoriteMovie">
            </div>
            <div class = "containerChildDetails">
              <p>Favorite genre: </p>
              <input type = "text" class = "inputDetail" id="inputFavoriteGenre">
            </div>
          </div>
           <button class="shareBtn" id="shareBtn" type="submit"> ENVIAR</button>
          </form>
        </div>      
      </section>
    </section>
    </main>
    `;

  const sectionView = document.createElement('section');
  sectionView.classList.add('containerUserProfileFather');
  sectionView.innerHTML = profileView;

  const form = sectionView.querySelector('#form');
  userState((user) => {
    if (user) {
      const uid = user.uid;
      const inputAboutMe = sectionView.querySelector('#inputAboutMe');
      const inputName = sectionView.querySelector('#inputName');
      const inputFavoriteMovie = sectionView.querySelector('#inputFavoriteMovie');
      const inputFavoriteGenre = sectionView.querySelector('#inputFavoriteGenre');
      const shareBtn = sectionView.querySelector('#shareBtn');
      // form.addEventListener('submit', (e) => {
      //   e.preventDefault();
      //   // console.log(inputAboutMe);
      //   if (inputAboutMe.length !== 0 || inputName.length !== 0 || inputFavoriteMovie.length !== 0 || inputFavoriteGenre.length !== 0) {
      //     createUserInfoProfile(inputName.value, uid, inputAboutMe.value, inputFavoriteMovie.value, inputFavoriteGenre.value).then(() => {
      //       form.reset();
      //       shareBtn.style.display = 'bloc';
      //       console.log('enviado');
      //     }).catch((err) => console.log(err.message));
      //   } else {
      //     showModal("You can't send and empty post");
      //   }
      // });
      const btnEditProfile = sectionView.querySelector('#btnEditProfile');
      getUserInfoProfileNow((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          // const docRef = doc.data();
          // inputAboutMe.value = docRef.aboutUser;
          // inputName.value = docRef.name;
          // inputFavoriteMovie.value = docRef.favoriteMovie;
          // inputFavoriteGenre.value = docRef.favoriteGenre;
          btnEditProfile.addEventListener('click', () => {
            console.log('click');
          });
        });
      });
    }
  });
  return sectionView;
};
