/* eslint-disable no-console */
import { userState } from '../Firebase/auth.js';
import {
  getPost,
  updatePost,
  getPostNow,
  deletePost,
  updateLike,
} from '../Firebase/firestore.js';

export default () => {
  const viewTimeLine = `
    <main class = "containerUserAndOthersPosts">
      <div class="containerPosts">
          <div class="containerAllUsersPosts"> </div>
      </div>
      <section class="modal hideIt" id="modal">
      </section>
    </main>
   `;
  const sectionView = document.createElement('section');
  sectionView.classList.add('containerTimeLine');
  sectionView.innerHTML = viewTimeLine;
  // FireStore
  const containerAllUsersPosts = sectionView.querySelector('.containerAllUsersPosts');
  let idPost = '';
  let editStatus = false;
  userState((user) => {
    if (user) {
      const uid = user.uid;
      // window.location.hash = '#/timeline';
      /* -------------------------Los posts enviados se mostrarán automaticamente------------ */
      getPostNow((snapshot) => {
        containerAllUsersPosts.innerHTML = '';
        snapshot.docs.forEach((doc) => {
          const publication = doc.data();
          const datePost = publication.date;
          const date = new Date(datePost);
          const myDate = `
          ${date.getHours()}:
          ${date.getMinutes()}`;
          if (doc.data().id === uid) {
            containerAllUsersPosts.innerHTML += `
            <div class ="usersPosts">
            <div class="postAuthor">
            <p>${publication.postAuthor}</p>
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
          } else {
            containerAllUsersPosts.innerHTML += `
            <div class ="usersPosts">
            <div class="postAuthor">
            <p>${publication.postAuthor}</p>
            <p class ="date">${myDate}</p>
            </div>
            <div class="postContainer">
            <p class="input">${publication.description}</p>
            <div class =" imgContainerPosts">
                <img src ="${publication.postPhoto}" class ="postImg">
              </div>
            </div>
            <div class="likeEditDelete">
            <i class="fa fa-heart-o btnLike" data-id="${doc.id}" aria-hidden="true"></i>
            <p>  ${publication.likes.length === 0 ? '' : publication.likes.length}</p>
            </div>`;
          }

          const btnDelete = sectionView.querySelectorAll('.btnDelete');
          btnDelete.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              const modalBox = sectionView.querySelector('#modal');
              modalBox.classList.toggle('hideIt');
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
                const postEditUser = docSnap.data();
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
                  console.log(like.classList.add('green'));
                }
                // console.log(postEditUser);
              }).catch((error) => console.log(error.message));
            });
          });

          const btnEdit = sectionView.querySelectorAll('#btnEdit');
          const modalBox = document.querySelector('#modal');
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
          const closeModalBtn = document.querySelector('#closeModalBtn');
          closeModalBtn.addEventListener('click', () => {
            modalBox.classList.toggle('hideIt');
          });
          btnEdit.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              modalBox.classList.toggle('hideIt');
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
                }).then(() => {
                  // console.log('se edito');
                  modalBox.classList.toggle('hideIt');
                }).catch((error) => console.log(error.message));
                editStatus = false;
                idPost = '';
              }
            });
          }); // fin de delete, edit
        });
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
