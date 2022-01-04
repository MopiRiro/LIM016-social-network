/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { userState } from '../lib/auth.js';
import {
  updateUserInfoProfile,
  getUserInfoProfileNow,
} from '../lib/firestore.js';
import { showModal } from '../functions/modals.js';

export default () => {
  const profileView = `
    <section class ="containerMainUserProfile">
      <section class = "containerUserProfile">
        <p id ="userNameDesktop"></p>
        <div class = 'containerPhoto' id ="photoDesktop">
        </div>
        <button class ="btnEditProfile
        ">Edit profile</button>
      </section>
      <section class = "containerUserProfileAboutMe">
      <div class = "containerProfileToEdit">
        <div class = "containerArrow">
          <i class="fas fa-chevron-left"></i>
        </div>
        <div class = "containerProfilePhoto">
        <div class = "containerEditPhoto">
          <p>Profile photo</p>
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </div>
        <div class = "containerPhoto" id ="photoMobile">
        </div>
     
      <div class = "containerEditUserProfile">
        <form id= "form">
          <div class = "containerAboutMe">
          <div class = "containerEditUserInfo">
            <p>About me</p>
            <i class="fa fa-pencil" aria-hidden="true" id ="editBtn"></i>
          </div>
          <input type = "text" readonly class = "inputAboutMe" id="inputAboutMe">
        </div>
        <div class = "containerDetails">
          <div class = "containerChildDetails">
            <p>Name: </p>
            <input type = "text" readonly class = "inputDetail" id="inputName">
          </div>
          <div class = "containerChildDetails">
            <p>Favorite movie: </p>
            <input type = "text" readonly class = "inputDetail" id="inputFavoriteMovie">
          </div>
          <div class = "containerChildDetails">
            <p>Favorite genre: </p>
            <input type = "text" readonly class = "inputDetail" id="inputFavoriteGenre">
          </div>
        </div>
        <div class="shareBtnContainer">
          <button class="shareBtn hideIt" id="shareBtn" type="submit"> ENVIAR</button>
        </div>
        </form>
      </div> 
        
        </div>     
      </section>
    </section>
    `;

  const sectionView = document.createElement('section');
  sectionView.classList.add('containerUserProfileFather');
  sectionView.innerHTML = profileView;

  userState((user) => {
    // console.log(user);
    // let idUser = '';
    const uid = user.uid;
    if (user) {
      console.log('tienen el mismo número');
      const inputAboutMe = sectionView.querySelector('#inputAboutMe');
      const inputName = sectionView.querySelector('#inputName');
      const inputFavoriteMovie = sectionView.querySelector('#inputFavoriteMovie');
      const inputFavoriteGenre = sectionView.querySelector('#inputFavoriteGenre');
      const shareBtn = sectionView.querySelector('#shareBtn');
      const form = sectionView.querySelector('#form');
      const editBtn = sectionView.querySelector('#editBtn');
      const userNameDesktop = sectionView.querySelector('#userNameDesktop');
      const photoDesktop = sectionView.querySelector('photoDesktop');
      const photoMobile = sectionView.querySelector('photoMobile');
      getUserInfoProfileNow((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const docRef = doc.data();
          // console.log(docRef.id);
          // console.log(uid);
          if (docRef.uid === uid) {
            inputAboutMe.value = docRef.aboutUser;
            inputName.value = docRef.name;
            inputFavoriteMovie.value = docRef.favMovie;
            inputFavoriteGenre.value = docRef.favGenre;
            userNameDesktop.textContent = docRef.name;
            editBtn.addEventListener('click', () => {
              console.log('click');
              shareBtn.classList.remove('hideIt');
              inputAboutMe.removeAttribute('readonly');
              inputName.removeAttribute('readonly');
              inputFavoriteMovie.removeAttribute('readonly');
              inputFavoriteGenre.removeAttribute('readonly');
              form.addEventListener('submit', (e) => {
                e.preventDefault();
                updateUserInfoProfile(doc.id, {
                  name: inputName.value,
                  aboutUser: inputAboutMe.value,
                  favMovie: inputFavoriteMovie.value,
                  favGenre: inputFavoriteGenre.value,
                }).then(() => {
                  showModal('Your information has been edited');
                  shareBtn.classList.add('hideIt');
                  inputAboutMe.setAttribute('readonly', true);
                  inputName.setAttribute('readonly', true);
                  inputFavoriteMovie.setAttribute('readonly', true);
                  inputFavoriteGenre.setAttribute('readonly', true);
                }).catch((error) => console.log(error.message));
              });
            });
          }
        });
      });
    }
  });
  return sectionView;
};
