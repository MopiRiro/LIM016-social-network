/* eslint-disable no-console */
import {
  createPost, getUserInfoProfileNow,
} from '../lib/firestore.js';

import { userState } from '../lib/auth.js';
import { showModal } from '../functions/modals.js';

import { uploadImg, getLink } from '../lib/storage.js';

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
               <input type="file" name="uploadfile" id="photo" style="display:none;"/>
               <label for="photo" id="photoLabel"><i class="fa fa-picture-o" aria-hidden="true"></i>Photo</label>
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
          // const randomId = Math.random().toString(36).substring(2);
          if (infoUser.uid === uid) {
            sendPost.addEventListener('submit', (e) => {
              e.preventDefault();
              const postInput = toPostInput.value.trim();
              const photo = moviePost.querySelector('#photo').files[0];
              if (postInput === '') {
                showModal("You can't send an empty post");
              } else if (photo.value === '') {
                showModal('You must select a photo');
              } else {
                uploadImg(email, photo).then(() => {
                  console.log('img uploaded');
                });
                getLink(email).then((url) => {
                  const img = url;
                  createPost(postInput, uid, name, img).then(() => {
                    sendPost.reset();
                  }).catch((error) => console.log(error.message));
                });
              }
            });
          }
        });
      });
    }
  });

  return moviePost;
};
