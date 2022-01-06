/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { userState } from '../Firebase/auth.js';
import {
  getUserInfoProfileNow,
  getPost,
  updatePost,
  getPostNow,
  deletePost,
  updateLike,
} from '../Firebase/firestore.js';
import { showModal } from '../functions/modals.js';

export default () => {
  const UserprofileView = `

        <section class = "containerUserProfileINfo">
          <div class ="containerUserProfileTimeline">
            <div class = 'containerPhoto' id ="photoDesktop">
            </div>
            <p id ="userNameDesktop"></p>
            <p id ="userEmail"></p>
            <p id ="userNickname"></p>
          </div>
          <div class ="userInfoo">
              <div class ="titleAndPen">
                <p>About me</p>
                <i class="fa fa-pencil fa-lg" aria-hidden="true"></i>
              </div>
              <p id ="userAboutMe"></p>
          </div>
          <div class ="userInfoo">
              <div class ="titleAndPen">
                <p>More about me</p>
                <i class="fa fa-pencil fa-lg" aria-hidden="true"></i>
              </div>  
              <div class ="flexStar">
              <div class ="getToKnowUserChild">
              <i class="fa fa-film fa-lg" aria-hidden="true"></i>
              <p id ="userFavMovie"></p>
            </div>
            <div class ="getToKnowUserChild">
              <i class="fa fa-map-pin fa-lg" aria-hidden="true"></i>
              <p id ="userCity"></p>
            </div>
            <div class ="getToKnowUserChild">
              <i class="fa fa-heart fa-lg" aria-hidden="true"></i>
              <p id ="userInterests"></p>
            </div> 
              </div>
          </div>
          <div class ="btnEditProfileContainer">
          <button class ="btnEditProfile" id="btnEditProfile">Edit profile</button>
          </div>
        </section>

        <section class = "containerMyPosts">  
          <section class = "containerUserAndOthersPosts">
            <div class="containerPosts">
                <div class="containerAllUsersPosts"> </div>
            </div>
            <section class="modal hideIt" id="modal">
            </section>
          </section>   
        </section>
    `;

  const sectionView = document.createElement('section');
  sectionView.classList.add('containerUserProfileWithPosts');
  sectionView.innerHTML = UserprofileView;

  const userNameDesktop = sectionView.querySelector('#userNameDesktop');
  const photoDesktop = sectionView.querySelector('#photoDesktop');
  const userEmail = sectionView.querySelector('#userEmail');
  const userAboutMe = sectionView.querySelector('#userAboutMe');
  const userFavMovie = sectionView.querySelector('#userFavMovie');
  const userNickname = sectionView.querySelector('#userNickname');
  const userCity = sectionView.querySelector('#userCity');
  const userInterests = sectionView.querySelector('#userInterests');
  const btnEditProfile = sectionView.querySelector('#btnEditProfile');
  const containerAllUsersPosts = sectionView.querySelector('.containerAllUsersPosts');
  // let idPost = '';
  // let editStatus = false;

  btnEditProfile.addEventListener('click', (e) => {
    e.preventDefault();
    e.preventDefault();
    window.location.hash = '#/editProfile';
  });
  userState((user) => {
    if (user) {
      const uid = user.uid;
      getUserInfoProfileNow((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const infoUser = doc.data();
          // console.log(infoUser);
          if (infoUser.uid === uid) {
            userNameDesktop.textContent = infoUser.name;
            userEmail.textContent = infoUser.email;
            photoDesktop.innerHTML = `
                   <img src="${infoUser.photo}" alt="userPhoto" class="userPhoto borderPhoto">
                  `;
            userAboutMe.textContent = infoUser.aboutUser;
            userFavMovie.textContent = infoUser.favMovie;
            userNickname.textContent = infoUser.nickname;
            userCity.textContent = infoUser.city;
            userInterests.textContent = infoUser.interests;
          }
        });
      });
      getPostNow((snapshot) => {
        // console.log(snapshot.docs.doc.data());
        containerAllUsersPosts.innerHTML = '';
        snapshot.docs.forEach((doc) => {
          const publication = doc.data();
          const datee = publication.date;
          const date = new Date(datee);
          // console.log();
          const myDate = `
          ${date.getHours()}:
          ${date.getMinutes()}`;
          if (publication.id === uid) {
            console.log(typeof (doc.id));
            containerAllUsersPosts.innerHTML += `
              <div class ="usersPosts">
              <div class="postAuthor">
              <p data-id="${doc.id}">${publication.postAuthor}</p>
              <p class ="date">${myDate}</p>
              </div>
              <div class="postContainer">
              <p class="input">${publication.description}</p>
              <div class =" imgContainerPosts">
                <img src ="${publication.postPhoto}" class ="postImg">
              </div>
              </div>
              <div class="likeEditDelete">
              <i class="fa fa-heart-o btnLike"  data-id="${doc.id}" aria-hidden="true"></i>
              <p id="counter"> ${publication.likes.length === 0 ? '' : publication.likes.length}</p>
              <i class="fa fa-pencil-square-o" aria-hidden="true" data-id="${doc.id}" id="btnEdit"></i>
              <i class="fa fa-trash-o btnDelete" aria-hidden="true" data-id="${doc.id}" id="btnDelete"></i>
              </div>
              </div>`;
          }
        });
      });
    }
  });
  return sectionView;
};
