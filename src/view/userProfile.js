/* eslint-disable no-unused-vars */
import { signOutUser, userState } from '../lib/auth.js';
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
          ">Edit Profile</button>
        </div>
        <div class = "containerEditUserProfile">
          <div class = "containerAboutMe">
            <div class = "containerEditUserInfo">
              <p>About me</p>
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </div>
            <input type = "text" class = "inputAboutMe">
          </div>
          <div class = "containerDetails">
            <div class = "containerChildDetails">
              <p>Name: </p>
              <input type = "text" class = "inputDetail">
            </div>
            <div class = "containerChildDetails">
              <p>Favorite movie: </p>
              <input type = "text" class = "inputDetail">
            </div>
            <div class = "containerChildDetails">
              <p>Favorite genre: </p>
              <input type = "text" class = "inputDetail">
            </div>
          </div>
        </div>      
      </section>
    </section>
    </main>
    `;

  const sectionView = document.createElement('section');
  sectionView.classList.add('containerUserProfileFather');
  sectionView.innerHTML = profileView;
  return sectionView;
};
