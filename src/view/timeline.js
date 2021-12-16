/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import { signOutUser } from '../lib/auth.js';
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
      <form id="sendPost">
        <div class="toPost">
         <input type="text" class="toPostInput" placeholder="What do you want to share?">
        </div>
         <div class="uploadAndShare">
             <i class="fa fa-file-image-o circleUpload" aria-hidden="true"></i>
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
  // const btnShare = sectionView.querySelector('.btnShare');
  let idPost = '';
  let editStatus = false;
  getPostNow((snapshot) => {
    containerAllUsersPosts.innerHTML = '';
    snapshot.docs.forEach((doc) => {
      const publication = doc.data();
      publication.id = doc.id;
      containerAllUsersPosts.innerHTML += `
      <div class ="usersPosts">
        <div class="userThatPostsInfo">
          <p>Jean</p>
        </div>
        <div class="usersToPost">
          <input type="text" readonly class="userToPostInput" value="${publication.description}"> </input>
        </div>
        <div class="likeAndShare">
          <i class="fa fa-heart circleIcon" aria-hidden="true"></i>
          <i class="fa fa-paper-plane circleIcon" aria-hidden="true" data-id="${publication.id}" id= "btnShareEdited"></i>
          <i class="fa fa-pencil circleIcon" aria-hidden="true" data-id="${publication.id}" id="btnEdit"></i>
          <i class="fa fa-trash circleIcon" aria-hidden="true" data-id="${publication.id}" id="btnDelete"></i>
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
      btnEdit.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          getPost(e.target.dataset.id).then((docSnap) => {
            if (docSnap.exists()) {
              const postEditUser = docSnap.data();
              editStatus = true;
              idPost = docSnap.id;
              userToPostInput.removeAttribute('readonly');
              userToPostInput.classList.add('userToPostInputPrueba');
              userToPostInput.value = postEditUser.description;
              userToPostInput.focus();
            }
          }).catch((error) => console.log(error.message));
        });

        const btnShareEdited = sectionView.querySelector('#btnShareEdited');
        btnShareEdited.addEventListener('click', () => {
          if (editStatus) {
            updatePost(idPost, {
              description: userToPostInput.value,
            }).then(() => {
              showModal('Your post has been edited');
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
    if (!editStatus) {
      createPost(postShareUser).then(() => {
        // getPosts();
        sendPost.reset();
      }).catch((error) => console.log(error.message));
    }
  });
  return sectionView;
};
