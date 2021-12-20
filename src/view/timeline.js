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
 <section class="modal hideIt" id="modal">
    </section>
    </main>
   `;
  const sectionView = document.createElement('section');
  sectionView.classList.add('containerTimeLine');
  sectionView.innerHTML = viewTimeLine;

  const btnSignOut = sectionView.querySelector('#btnSignOut');
  btnSignOut.addEventListener('click', (e) => {
    e.preventDefault();
    signOutUser().then(() => {
    // Sign-out successful.
      window.location.hash = '#/';
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
  const profilePictureNavMobile = sectionView.querySelector('.profilePicture');
  const profilePicture = document.querySelector('.defaultImg');
  // const btnShare = sectionView.querySelector('.btnShare');
  let idPost = '';
  let editStatus = false;
  userState((user) => {
    if (user) {
      const uid = user.uid;
      // window.location.hash = '#/timeline';
      const userName = user.displayName ? user.displayName : 'New User';
      const userEmail = user.email;
      const userPhoto = user.photoURL ? user.photoURL : profilePicture.classList.remove('hideIt');
      console.log(user);
      // console.log(user);
      userNameNavBar.textContent = userName;
      userNameTimeLine.textContent = userName;
      userEmailTimeLine.textContent = userEmail;
      profilePictureUser.innerHTML = `
       <img src="${userPhoto}" alt="userPhoto">
      `;
      profilePictureNavMobile.innerHTML = `
      <img src="${userPhoto}" alt="userPhoto">
     `;
      getPostNow((snapshot) => {
        containerAllUsersPosts.innerHTML = '';
        snapshot.docs.forEach((doc) => {
          const publication = doc.data();
          console.log(doc.data());
          // publication.id = doc.id;
          if (doc.data().id === uid) {
            containerAllUsersPosts.innerHTML += `
            <div class ="usersPosts">
            <div class="userThatPostsInfo">
            <p>${publication.postAuthor}</p>
            </div>
            <div class="usersToPost">
            <input type="text" readonly class="userToPostInput cursorDefault" value="${publication.description}"> </input>
            </div>
            <div class="likeAndShare">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
            <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
            <i class="fa fa-pencil-square-o" aria-hidden="true" data-id="${doc.id}" id="btnEdit"></i>
            <i class="fa fa-trash-o" aria-hidden="true" data-id="${doc.id}" id="btnDelete"></i>
            <button class="shareBtn hideIt shareEdited" data-id="${doc.id}" id= "btnShareEdited"> SHARE</button>
            </div>
            </div>`;
          } else {
            containerAllUsersPosts.innerHTML += `
            <div class ="usersPosts">
            <div class="userThatPostsInfo">
            <p>${publication.postAuthor}</p>
            </div>
            <div class="usersToPost">
            <input type="text" readonly class="userToPostInput cursorDefault" value="${publication.description}"> </input>
            </div>
            <div class="likeAndShare">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
            <i class="fa fa-paper-plane-o" aria-hidden="true"></i>

            </div>`;
          }

          const btnDelete = sectionView.querySelectorAll('#btnDelete');

          btnDelete.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              console.log('clickaedo');
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
          }); // termina delete

          const userToPostInput = sectionView.querySelector('.userToPostInput');
          const btnEdit = sectionView.querySelectorAll('#btnEdit');
          const btnShareEdited = sectionView.querySelector('#btnShareEdited');
          btnEdit.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              getPost(e.target.dataset.id).then((docSnap) => {
                // if (docSnap.exists()) {
                const postEditUser = docSnap.data();
                editStatus = true;
                idPost = docSnap.id;
                btnShareEdited.classList.remove('hideIt');
                userToPostInput.removeAttribute('readonly');
                userToPostInput.classList.remove('cursorDefault');
                userToPostInput.classList.add('userToPostInputPrueba');
                userToPostInput.value = postEditUser.description;
                userToPostInput.focus();
                // }
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
          }); // fin de delete, edit
          // fin del condicional para chequear id del post y uduario
        });
      });

      sendPost.addEventListener('submit', (e) => {
        e.preventDefault();
        const postShareUser = toPostInput.value;
        if (postShareUser.length !== 0) {
          createPost(postShareUser, uid, userName, Date.now()).then(() => {
            // getPosts();
            sendPost.reset();
          }).catch((error) => console.log(error.message));
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

  // Get button Go Up
  // const mybuttonGoUp = sectionView.querySelector('#myBtn');
  // window.onscroll = () => {
  //   // eslint-disable-next-line no-use-before-define
  //   scrollFuntion();
  // };

  // function scrollFuntion() {
  //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //     mybuttonGoUp.style.display = 'block';
  //   } else {
  //     mybuttonGoUp.style.display = 'none';
  //   }
  // }

  // // When the user clicks on the button, scroll to the top of the document
  // mybuttonGoUp.onclick = function topFunction() {
  //   sectionView.scrollTop = 0;
  //   sectionView.sectionViewElement.scrollTop = 0;
  // };

  return sectionView;
};
