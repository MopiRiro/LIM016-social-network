/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { userState } from '../Firebase/auth.js';
import {
  getUserInfoProfile,
  getPost,
  updatePost,
  getPostNow,
  deletePost,
} from '../Firebase/firestore.js';

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
          <div class = 'userInfoLeft'>
          <div class ="userInfoo">
              <div class ="titleAndPen">
                <p>About me</p>
              </div>
              <p id ="userAboutMe"></p>
          </div>
          <div class ="userInfoo">
              <div class ="titleAndPen">
                <p>More about me</p>
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
          </div>
          <div class ="btnEditProfileContainer">
          <button class ="btnEditProfile btnEdit" id="btnEditProfile">Edit profile</button>
          </div>
        </section>

         <div class="containerAllUsersPosts right"> </div>
            <section class="modal hideIt" id="modal">
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

  let idPost = '';
  let editStatus = false;

  btnEditProfile.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/editProfile';
  });
  userState(async (user) => {
    if (user) {
      const uid = user.uid;
      const myUserInfo = await getUserInfoProfile(uid);
      const infoUser = myUserInfo.data();
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
      getPostNow((snapshot) => {
        containerAllUsersPosts.innerHTML = '';
        snapshot.docs.forEach((doc) => {
          const publication = doc.data();
          const datee = publication.date;
          const date = new Date(datee);
          const myDate = `
          ${date.getHours()}:
          ${date.getMinutes()}`;
          if (publication.id === uid) {
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
          const btnDelete = sectionView.querySelectorAll('.btnDelete');
          btnDelete.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              console.log('clickeado');
              const modalBox = sectionView.querySelector('#modal');
              modalBox.classList.remove('hideIt');
              modalBox.innerHTML = `
                  <div class='modalContent'>
                  <i class="fa fa-trash-o modalIconTrash" aria-hidden="true"></i>
                  <p class='modalText'>Are you sure you want to delete your post?</p>
                  <div class= "modalBtns">
                  <button class='agreeBtn widerBtn' id="yes">Yes</button>
                  <button class='closeBtn widerBtn' id="no">No</button>
                  </div>
                  </div>`;
              sectionView.querySelector('#yes').addEventListener('click', () => {
                deletePost(e.target.dataset.id);
                modalBox.classList.add('hideIt');
              });

              sectionView.querySelector('#no').addEventListener('click', () => {
                modalBox.classList.add('hideIt');
              });
            });
          }); // termina delete

          const btnLike = sectionView.querySelectorAll('.btnLike');
          btnLike.forEach((like) => {
            like.addEventListener('click', (e) => {
              getPost(e.target.dataset.id).then((docSnap) => {
                const postEditUser = docSnap.data();
                if (postEditUser.likes.includes(uid)) {
                  // aquí voy a deslikear
                  updatePost(e.target.dataset.id, {
                    likes: postEditUser.likes.filter((element) => element !== uid),
                  });
                } else {
                  // aquí voy a likear
                  updatePost(e.target.dataset.id, {
                    likes: [...postEditUser.likes, uid],
                  });
                }
              }).catch((err) => console.log(err.message));
            });
          });

          const btnEdit = sectionView.querySelectorAll('#btnEdit');
          const modalBox = sectionView.querySelector('#modal');
          modalBox.innerHTML = `
          <div class='modalContent thinerModal'>
            <div class ="movieInfo">
            <input type="text" class='modalEdit' id="inputmodalUpdate"/>
            </div>
              <div class= "modalBtns">
                <button class='agreeBtn widerBtn' id='btnUpdateModal'>Update</button>
                <button class='closeBtn widerBtn' id='closeModalBtn'>Close</button>
              </div>
          </div>`;
          const inputmodalUpdate = sectionView.querySelector('#inputmodalUpdate');
          const closeModalBtn = sectionView.querySelector('#closeModalBtn');
          closeModalBtn.addEventListener('click', () => {
            modalBox.classList.add('hideIt');
          });
          btnEdit.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              modalBox.classList.remove('hideIt');
              getPost(e.target.dataset.id).then((docSnap) => {
                const postEditUser = docSnap.data();
                editStatus = true;
                idPost = docSnap.id;
                inputmodalUpdate.value = postEditUser.description;
              }).catch((error) => console.log(error.message));
            });
            const btnUpdateModal = sectionView.querySelector('#btnUpdateModal');
            btnUpdateModal.addEventListener('click', () => {
              if (editStatus) {
                updatePost(idPost, {
                  description: inputmodalUpdate.value,
                });
                modalBox.classList.add('hideIt');

                editStatus = false;
                idPost = '';
              }
            });
          }); // fin de delete, edit
        });
      });
    }
  });
  return sectionView;
};
