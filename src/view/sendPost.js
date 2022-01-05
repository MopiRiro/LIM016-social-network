/* eslint-disable no-console */
import {
  createPost, getUserInfoProfileNow,
} from '../lib/firestore.js';

import { userState } from '../lib/auth.js';
import { showModal } from '../functions/modals.js';

import { uploadImg } from '../lib/storage.js';

export default () => {
  const post = ` 
  <div class ="prueb">
       kkkkk
       </div> 
        <div class ="containerUserPosts">
          <form id ="sendPost">
            <div class="toPost">
            <input type="text" class="toPostInput" id="inputPost" placeholder="What do you want to share?">
            </div>
            <div class="uploadAndShare">
               <div class ="upload">
               <i class="fa fa-picture-o" aria-hidden="true"></i>
               <input type ="file" multiple id ="photo">
               </div>
                <button class="shareBtn" id="sharePost" type="submit"> SHARE</button>
            </div>
          </form>  
         <section class="modal hideIt" id="modalToSendPost">
         </section>
        </div>
       <div class ="prueb">
       kkkkk
       </div> 

`;
  const moviePost = document.createElement('section');
  moviePost.classList.add('containerUserAndOthersPosts');
  moviePost.innerHTML = post;

  userState((user) => {
    if (user) {
      const uid = user.uid;
      // let userName = '';
      // window.location.hash = '#/timeline';
      const sendPost = moviePost.querySelector('#sendPost');
      const toPostInput = moviePost.querySelector('#inputPost');
      // const sharePost = moviePost.querySelector('#sharePost');
      getUserInfoProfileNow((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const infoUser = doc.data();
          const name = infoUser.name;
          const email = infoUser.email;
          if (infoUser.uid === uid) {
            sendPost.addEventListener('submit', (e) => {
              e.preventDefault();
              const postInput = toPostInput.value.trim();
              const photo = moviePost.querySelector('#photo').files[0];
              if (postInput === '' || photo.value == '') {
                showModal("You can't send an empty post");
              } else {
                uploadImg(email, photo).then(() => {
                  console.log('img uploaded');
                });
                createPost(postInput, uid, name).then(() => {
                  sendPost.reset();
                }).catch((error) => console.log(error.message));
              }
            });
          }
        });
      });
    }
  });

  return moviePost;
};
