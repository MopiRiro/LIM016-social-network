/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import { userState } from '../lib/auth.js';
import {
  getPost,
  updatePost,
  getPostNow,
  deletePost,
  updateLike,
  getUsers,
} from '../lib/firestore.js';

export default () => {
  const viewTimeLine = `
    <div class = "containerUserAndOthersPosts">
      <div class="containerPosts">
          <div class="containerAllUsersPosts"> </div>
      </div>
      <section class="modal hideIt" id="modal">
      </section>
    </div>
   `;
  const sectionView = document.createElement('section');
  // sectionView.classList.add('containerPosts');
  sectionView.innerHTML = viewTimeLine;

  // FireStore
  const containerAllUsersPosts = sectionView.querySelector('.containerAllUsersPosts');
  let idPost = '';
  let editStatus = false;
  userState((user) => {
    if (user) {
      const uid = user.uid;
      /* -------------------------Los posts enviados se mostrarán automaticamente------------ */
      getPostNow((snapshot) => {
        containerAllUsersPosts.innerHTML = '';
        snapshot.docs.forEach((doc) => {
          const publication = doc.data();
          // console.log(publication);
          const datee = publication.date;
          const date = new Date(datee);
          // console.log();
          const myDate = `
          ${date.getHours()}:
          ${date.getMinutes()}`;

          if (publication.postId === uid) {
            containerAllUsersPosts.innerHTML += `
            <div class ="usersPosts">
              <div class="postAuthor">
                <p id="postAuth">${publication.postAuthor}</p>
                <p class = 'date'>${myDate}</p>
              </div>
              <div class="postContainer">
                <p class="input">${publication.description}</p>
              </div>
              <div class="likeEditDelete">
                <i class="fa fa-heart-o btnLike" id="btnLike" data-id="${doc.id}" aria-hidden="true"></i>
                <p id="counter"> ${publication.likes.length === 0 ? '' : publication.likes.length}</p>
                <i class="fa fa-pencil-square-o" aria-hidden="true" data-id="${doc.id}" id="btnEdit"></i>
                <i class="fa fa-trash-o btnDelete" aria-hidden="true" data-id="${doc.id}" id="btnDelete"></i>
              </div>
            </div>`;
          } else {
            containerAllUsersPosts.innerHTML += `
            <div class ="usersPosts">
              <div class="postAuthor">
                <p id="postAuth">${publication.postAuthor}</p>
                <p  class = 'date'>${myDate}</p>
              </div>
              <div class="postContainer">
                <p class="input">${publication.description}</p>
              </div>
              <div class="likeEditDelete">
                <i class="fa fa-heart-o btnLike" id="btnLike" data-id="${doc.id}" aria-hidden="true"></i>
                <p>  ${publication.likes.length === 0 ? '' : publication.likes.length}</p>
            </div>`;
          }
        }); // termina el forEACH

        const btnDelete = sectionView.querySelectorAll('#btnDelete');
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

        const btnLike = sectionView.querySelectorAll('#btnLike');
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
        // const authName = sectionView.querySelector('#postAuth');
        // console.log(authName.textContent);
        let nameUser = '';
        getUsers().then((snap) => {
          snap.docs.forEach((users) => {
            const userInfo = users.data();
            if (userInfo.uid === uid) {
              // console.log(userInfo.name);
              nameUser = userInfo.name;
            }
          });
          updatePost(uid, {
            postAuthor: nameUser,
          }).then(() => {
            console.log('se edito');
          }).catch((error) => console.log(error.message));
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
                modalBox.classList.toggle('hideIt');
              }).catch((error) => console.log(error.message));
              editStatus = false;
              idPost = '';
            }
          });
        }); // fin de delete, edit, like
      }); // termina get post now
      // ...
    } // termina el que chequea si existe un usuario
  }); // termina la función userState

  return sectionView;
};
