/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { userState } from '../Firebase/auth.js';
import {
  updateUserInfoProfile,
  getUserInfoProfile,
} from '../Firebase/firestore.js';
import { showModal } from '../functions/modals.js';

export default () => {
  const profileView = `
    <section class ="containerMainUserProfile">

      <section class = "containerUserProfileAboutMe">
      <div class = "containerProfileToEdit">
        <div class = "containerProfilePhoto">
            <div class = "containerEditPhoto">
            <p>Profile photo</p>
            </div>
            <div class = "containerPhoto" id ="photoMobile">
        </div>
     
      <div class = "containerEditUserProfile">
        <form id= "form">
          <div class = "containerAboutMe">
          <div class = "containerEditUserInfo">
            <p>About me</p>
          </div>
          <input type = "text" class = "inputAboutMe" id="inputAboutMe">
        </div>
        <div class = "containerDetails">
          <div class = "containerChildDetails">
            <p>Nickname: </p>
            <input type = "text" class = "inputDetail" id="inputNickname">
          </div>
          <div class = "containerChildDetails">
            <p>Favorite movie: </p>
            <input type = "text" class = "inputDetail" id="inputFavMovie">
          </div>
          <div class = "containerChildDetails">
            <p>City/Country: </p>
            <input type = "text" class = "inputDetail" id="inputCity">
          </div>
          <div class = "containerChildDetails">
            <p>My interests: </p>
            <input type = "text" class = "inputDetail" id="inputInterest">
          </div>
        </div>
        <div class="shareBtnContainer">
          <button class="shareBtn" id="shareBtn" type="submit"> UPDATE</button>
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

  userState(async (user) => {
    const uid = user.uid;
    if (user) {
      console.log('tienen el mismo número');
      const inputAboutMe = sectionView.querySelector('#inputAboutMe');
      const inputNickname = sectionView.querySelector('#inputNickname');
      const inputFavMovie = sectionView.querySelector('#inputFavMovie');
      const inputCity = sectionView.querySelector('#inputCity');
      const inputInterest = sectionView.querySelector('#inputInterest');
      const form = sectionView.querySelector('#form');
      const photoMobile = sectionView.querySelector('#photoMobile');

      const myUserInfo = await getUserInfoProfile(uid);
      const docRef = myUserInfo.data();
      inputAboutMe.value = docRef.aboutUser;
      inputNickname.value = docRef.nickname;
      inputFavMovie.value = docRef.favMovie;
      inputCity.value = docRef.city;
      inputInterest.value = docRef.interests;
      photoMobile.innerHTML = `
            <img src="${docRef.photo}" alt="userPhoto" class="userPhoto borderPhoto">
           `;
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await updateUserInfoProfile(uid, {
          aboutUser: inputAboutMe.value,
          nickname: inputNickname.value,
          favMovie: inputFavMovie.value,
          city: inputCity.value,
          interests: inputInterest.value,
        });
        showModal('Your information has been edited');
        window.location.hash = '#/userProfile';
      });
    }
  });
  return sectionView;
};
