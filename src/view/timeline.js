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
        <div class="toPost">
            <input type="text" class="toPostInput" placeholder="What do you want to share?">
        </div>
        <div class="uploadAndShare">
            <i class="fa fa-file-image-o circleUpload" aria-hidden="true"></i>
            <button class="shareBtn"> SHARE</button>
        </div>
    </div>
    <div class="containerOthersPosts">
        
    </div>
</div>
<button id="btnPrueba">Prueba</button>
<button id="myBtn" title="Go to top"><i class="fas fa-arrow-up"></i></button>
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
    }).catch((error) => {
      console.log(error);
    // An error happened.
    });
  });

  // FireStore
  const containerUsersPosts = sectionView.querySelector('.containerOthersPosts');
  const btnShare = sectionView.querySelector('.shareBtn');
  const toPostInput = sectionView.querySelector('.toPostInput');
  let idPost = '';
  let editStatus = false;
  const btnPrueba = sectionView.querySelector('#btnPrueba');
  btnPrueba.addEventListener('click', () => {
    getPostNow((snapshot) => {
      containerUsersPosts.innerHTML = '';
      snapshot.docs.forEach((doc) => {
        const publication = doc.data();
        publication.id = doc.id;
        containerUsersPosts.innerHTML += `
        <div class="othersInfo">
          <p>Jean</p>
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="othersToPost">
          <input type="text" class="othersToPostInput" value="${publication.description}"> </input>
        </div>
        <div class="likeAndShare">
          <i class="fa fa-heart circleIcon" aria-hidden="true"></i>
          <i class="fa fa-paper-plane circleIcon" aria-hidden="true"></i>
          <i class="fa fa-pencil circleIcon" aria-hidden="true" data-id="${publication.id}" id="btnEdit"></i>
          <i class="fa fa-trash circleIcon" aria-hidden="true" data-id="${publication.id}" id="btnDelete"></i>
        </div>`;
        const btnDelete = sectionView.querySelectorAll('#btnDelete');
        btnDelete.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            // eslint-disable-next-line no-alert
            confirm('Quieres Eliminar');
            deletePost(e.target.dataset.id).then(() => {

            }).catch((error) => {
              console(error.message);
            });
          });
        });
        const btnEdit = sectionView.querySelectorAll('#btnEdit');
        btnEdit.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            getPost(e.target.dataset.id).then((docSnap) => {
              if (docSnap.exists()) {
                const postEditUser = docSnap.data();
                editStatus = true;
                idPost = docSnap.id;
                toPostInput.value = postEditUser.description;
                btnShare.innerText = 'Editar';
              } else {
                console.log('no se encontro documento');
              }
            });
          });
        });
      });
    });
  });

  btnShare.addEventListener('click', () => {
    const postShareUser = toPostInput.value;
    if (!editStatus) {
      createPost(postShareUser).then(() => {
        // getPosts();
        // postShareUser.innerHTML = '';
      }).catch((error) => console.log(error.message));
    } else {
      updatePost(idPost, {
        description: postShareUser,
      }).then(() => {
        // postShareUser.innerHTML = '';
        console.log('se edito');
      }).catch((error) => console.log(error.message));
    }
  });
  return sectionView;
};
