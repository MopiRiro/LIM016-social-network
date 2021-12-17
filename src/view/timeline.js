/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import { signOutUser, userState } from '../lib/auth.js';
import {
  createPost,
  getPost,
  updatePost,
  getPostNow,
  deletePost,
} from '../lib/firestore.js';
import { showModal } from '../functions/modals.js';

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
          <li class ="userNameNavBar">fulana</li>
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
        </div>
        <div class="userInfo">
            <p class ="userNameTimeline"> </p>
            <p class="userEmail"></p>
        </div>
    </div>
</div>

<div class="containerPosts">
    <div class="containerUserPosts">
      <form id="sendPost">
        <div class="toPost">
         <input type="text" class="toPostInput" placeholder="What do you want to share?">
        </div>
         <div class="uploadAndShare">
             <i class="fa fa-picture-o" aria-hidden="true"></i>
             <p>Photo</p>
             <button class="shareBtn" type="submit"> SHARE</button>
         </div>
      </form>
    </div>
    <div class="containerAllUsersPosts">
        
    </div>
</div>
<button id="myBtn" title="Go to top"><i class="fas fa-arrow-up"></i></button>
<section class="modal hideIt" id="modal">
    </section>
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
    signOutUser().then(() => {
    // Sign-out successful.
      window.location.hash = '#/';
      alert('debes estar loagueado para ver los posts');
    }).catch((error) => {
      console.log(error);
    // An error happened.
    });
  });

  // FireStore
  const containerAllUsersPosts = sectionView.querySelector('.containerAllUsersPosts');
  const sendPost = sectionView.querySelector('#sendPost');
  const toPostInput = sectionView.querySelector('.toPostInput');
  const userNameNavBar = sectionView.querySelector('.userNameNavBar');
  const userNameTimeLine = sectionView.querySelector('.userNameTimeline');
  const userEmailTimeLine = sectionView.querySelector('.userEmail');
  const profilePictureUser = sectionView.querySelector('.profilePictureUser');
  // const btnShare = sectionView.querySelector('.btnShare');
  let idPost = '';
  let editStatus = false;
  userState((user) => {
    if (user) {
      const uid = user.uid;
      // window.location.hash = '#/timeline';
      const userName = user.displayName;
      const userEmail = user.email;
      const userPhoto = user.photoURL;
      console.log(uid);
      console.log(user);
      userNameNavBar.textContent = userName;
      userNameTimeLine.textContent = userName;
      userEmailTimeLine.textContent = userEmail;
      profilePictureUser.innerHTML = `
       <img src="${userPhoto}" alt="userPhoto">
      `;
      // userProfilePhoto.src = userPhoto;
      // profilePictureUser.appendChild(userProfilePhoto);

      getPostNow((snapshot) => {
        containerAllUsersPosts.innerHTML = '';
        snapshot.docs.forEach((doc) => {
          const publication = doc.data();
          // console.log(publication.)
          console.log(publication);
          publication.id = doc.id;
          containerAllUsersPosts.innerHTML += `
          <div class ="usersPosts">
            <div class="userThatPostsInfo">
              <p>${userName}</p>
            </div>
            <div class="usersToPost">
              <input type="text" readonly class="userToPostInput cursorDefault" value="${publication.description}"> </input>
            </div>
            <div class="likeAndShare">
              <i class="fa fa-heart-o" aria-hidden="true"></i>
              <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
              <i class="fa fa-pencil-square-o" aria-hidden="true" data-id="${publication.id}" id="btnEdit"></i>
              <i class="fa fa-trash-o" aria-hidden="true" data-id="${publication.id}" id="btnDelete"></i>
              <button class="shareBtn hideIt shareEdited" data-id="${publication.id}" id= "btnShareEdited"> SHARE</button>
            </div>
            </div>`;

          const btnDelete = sectionView.querySelectorAll('#btnDelete');
          btnDelete.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              const modalBox = sectionView.querySelector('#modal');
              modalBox.classList.toggle('hideIt');
              modalBox.innerHTML = `
              <div class='modalContent'>
              <p class='modalText'>Are you sure you want to delete your post?</p>
              <button class='closeModalBtn' id="yes">Yes</button>
              <button class='closeModalBtn' id="no">No</button>
              </div>`;
              sectionView.querySelector('#yes').addEventListener('click', () => {
                deletePost(e.target.dataset.id).then(() => {
                }).catch((error) => {
                  console(error.message);
                });
                modalBox.classList.toggle('hideIt');
              });
              sectionView.querySelector('#no').addEventListener('click', () => {
                modalBox.classList.toggle('hideIt');
              });
            });
          });

          const userToPostInput = sectionView.querySelector('.userToPostInput');
          const btnEdit = sectionView.querySelectorAll('#btnEdit');
          const btnShareEdited = sectionView.querySelector('#btnShareEdited');
          btnEdit.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              getPost(e.target.dataset.id).then((docSnap) => {
                if (docSnap.exists()) {
                  const postEditUser = docSnap.data();
                  editStatus = true;
                  idPost = docSnap.id;
                  btnShareEdited.classList.remove('hideIt');
                  userToPostInput.removeAttribute('readonly');
                  userToPostInput.classList.remove('cursorDefault');
                  userToPostInput.classList.add('userToPostInputPrueba');
                  userToPostInput.value = postEditUser.description;
                  userToPostInput.focus();
                }
              }).catch((error) => console.log(error.message));
            });

            btnShareEdited.addEventListener('click', () => {
              if (editStatus) {
                updatePost(idPost, {
                  description: userToPostInput.value,
                }).then(() => {
                  showModal('Your post has been edited');
                  btnShareEdited.classList.add('hideIt');
                  // console.log('se edito');
                }).catch((error) => console.log(error.message));
                editStatus = false;
                idPost = '';
              }
            });
          });
        });
      });

      sendPost.addEventListener('submit', (e) => {
        e.preventDefault();
        const postShareUser = toPostInput.value;
        if (postShareUser.length !== 0) {
          if (!editStatus) {
            createPost(postShareUser).then(() => {
              // getPosts();
              sendPost.reset();
            }).catch((error) => console.log(error.message));
          }
        } else {
          showModal('no puedes dejar tu post vacio');
        }
      });
      // ...
    } else {
      // User is signed out
      window.location.hash = '#/';
      // ...
    }
  });

  return sectionView;
};
