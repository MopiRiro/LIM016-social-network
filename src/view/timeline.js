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
  updateLike,
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
          <li class ="userNameNavBar"></li>
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
             <p class = "iconUploadLetter">Photo</p>
             <button class="shareBtn" type="submit"> SHARE</button>
         </div>
      </form>
    </div>
    <div class="containerAllUsersPosts">
        
    </div>
</div>
  <section class ="movieSection">
  <div class = "moviePosters">
  <div class ="titleAndPoster">
  <img src ="./img/spiderman.jpg" class ="movieImg">
  <p>TRENDING NOW</p>
  </div>
  <div class ="titleAndPoster">
  <img src ="./img/rampage.jpg" class ="movieImg">
  <p>ACTION MOVIES</p>
  </div>
  <div class ="titleAndPoster">
  <img src ="./img/grinch.jpg" class ="movieImg">
  <p>HOLIDAYS</p>
  </div>
</div>
  </section>
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
    }).catch((error) => { console.log(error); });
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
  // const profilePicture = document.querySelector('.defaultImg');
  // const btnShare = sectionView.querySelector('.btnShare');
  let idPost = '';
  let editStatus = false;
  userState((user) => {
    if (user) {
      const uid = user.uid;
      // window.location.hash = '#/timeline';
      const userName = user.displayName;
      // const indexX = userName.indexOf(' ');
      // eslint-disable-next-line no-unneeded-ternary
      const newUserName = userName ? userName : 'New User';
      console.log(newUserName);
      const userEmail = user.email;
      const userPhoto = user.photoURL ? user.photoURL : './img/profileDefault.png';
      console.log(user);
      // console.log(user);
      userNameNavBar.textContent = newUserName;
      userNameTimeLine.textContent = newUserName;
      userEmailTimeLine.textContent = userEmail;
      profilePictureUser.innerHTML = `
       <img src="${userPhoto}" alt="userPhoto" class="userPhoto">
      `;
      profilePictureNavMobile.innerHTML = `
      <img src="${userPhoto}" alt="userPhoto" class="userPhoto">
     `;
      getPostNow((snapshot) => {
        containerAllUsersPosts.innerHTML = '';
        snapshot.docs.forEach((doc) => {
          const publication = doc.data();
          // console.log(doc.data());
          // publication.id = doc.id;
          if (doc.data().id === uid) {
            containerAllUsersPosts.innerHTML += `
            <div class ="usersPosts">
            <div class="userThatPostsInfo">
            <p>${publication.postAuthor}</p>
            </div>
            <div class="usersToPost">
            <input type="text" readonly class="userToPostInput cursorDefault" id ="${doc.id}"  value="${publication.description}"> </input>
            </div>
            <div class="likeAndShare">
            <i class="fa fa-heart-o btnLike"  data-id="${doc.id}" aria-hidden="true"></i>
            <p> ${publication.likes.length}</p>
            <i class="fa fa-pencil-square-o" aria-hidden="true" data-id="${doc.id}" id="btnEdit"></i>
            <i class="fa fa-trash-o btnDelete" aria-hidden="true" data-id="${doc.id}" id="btnDelete"></i>
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
            <i class="fa fa-heart-o btnLike" data-id="${doc.id}" aria-hidden="true"></i>
            <p> ${publication.likes.length}</p>
            </div>`;
          }

          const btnDelete = sectionView.querySelectorAll('.btnDelete');
          // console.log(btnDelete);
          btnDelete.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              console.log('clickaedo');
              const modalBox = sectionView.querySelector('#modal');
              modalBox.classList.toggle('hideIt');
              modalBox.innerHTML = `
                  <div class='modalContent'>
                  <i class="fa fa-trash-o modalIconTrash" aria-hidden="true"></i>
                  <p class='modalText'>Are you sure you want to delete your post?</p>
                  <div class= "modalBtns">
                  <button class='closeModalBtn' id="yes">Yes, delete my post</button>
                  <button class='closeModalBtn' id="no">No, keep my post</button>
                  </div>
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

          const btnLike = sectionView.querySelectorAll('.btnLike');
          // console.log(btnLike);
          btnLike.forEach((like) => {
            like.addEventListener('click', (e) => {
              // console.log(e.target.dataset.id);
              getPost(e.target.dataset.id).then((docSnap) => {
                // console.log(uid);
                const postEditUser = docSnap.data();
                console.log(postEditUser);
                if (postEditUser.likes.includes(uid)) {
                  // aquí voy a deslikear
                  updateLike(e.target.dataset.id,
                    postEditUser.likes.filter((element) => element !== uid));
                  console.log('sí había dado like');
                } else {
                  // aquí voy a likear
                  console.log('no había dado like');
                  updateLike(e.target.dataset.id,
                    [...postEditUser.likes, uid]);
                }
                // console.log(postEditUser);
              }).catch((error) => console.log(error.message));
            });
          });

          const btnEdit = sectionView.querySelectorAll('#btnEdit');
          // console.log(btnEdit);
          // const btnShareEdited = sectionView.querySelector('#btnShareEdited');
          // const userToPostInput = sectionView.querySelector('.userToPostInput');
          const modalBox = document.querySelector('#modal');
          modalBox.innerHTML = `
          <div class='modalContent'>
          <input type="text" class='modalEdit'/>
            <div class= "modalBtns">
            <button class='btnUpdateModal'>Update</button>
              <button class='closeModalBtn'>Close</button>
            </div>
          </div>`;
          const modalEdit = sectionView.querySelector('.modalEdit');
          const modalClose = document.querySelector('.closeModalBtn');
          modalClose.addEventListener('click', () => {
            modalBox.classList.toggle('hideIt');
          });
          btnEdit.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              modalBox.classList.toggle('hideIt');
              // window.addEventListener('click', (e) => {
              //   if (e.target === modalBox) {
              //     modalBox.classList.toggle('hideIt');
              //   }
              // });
              getPost(e.target.dataset.id).then((docSnap) => {
                const postEditUser = docSnap.data();
                editStatus = true;
                idPost = docSnap.id;
                modalEdit.value = postEditUser.description;
              }).catch((error) => console.log(error.message));
            });
            const btnUpdateModal = sectionView.querySelector('.btnUpdateModal');
            btnUpdateModal.addEventListener('click', () => {
              // console.log('BTN EDIT');
              if (editStatus) {
                // userToPostInput = sectionView.querySelector(e.target.dataset.id);
                updatePost(idPost, {
                  description: modalEdit.value,
                }).then(() => {
                  // console.log('se edito');
                }).catch((error) => console.log(error.message));
                editStatus = false;
                idPost = '';
              }
            });
            // btnShareEdited.addEventListener('click', () => {
            // });
          }); // fin de delete, edit
        });
      });
      // const likes = [];
      sendPost.addEventListener('submit', (e) => {
        e.preventDefault();
        const postShareUser = toPostInput.value;
        if (postShareUser.length !== 0) {
          createPost(postShareUser, uid, newUserName, Date.now()).then(() => {
            // getPosts();
            sendPost.reset();
          }).catch((error) => console.log(error.message));
        } else {
          showModal("You can't send an empty post");
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
