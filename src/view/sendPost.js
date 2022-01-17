/* eslint-disable no-console */
import {
  createPost, getUserInfoProfile,
} from '../Firebase/firestore.js';

import { userState } from '../Firebase/auth.js';
import { showModal } from '../functions/modals.js';

import { uploadImg, getLink } from '../Firebase/storage.js';

export default () => {
  const post = ` 
  <div class ="prueb">
       ....
       </div> 
        <div class ="containerUserPosts">
          <form id ="sendPost">
            <div class="toPost">
            <input type="text" class="toPostInput" id="inputPost" placeholder="What do you want to share?">
            </div>
            <div class="uploadAndShare">
               <div class ="upload">
               <input type="file" name="uploadfile" id="photo" style="display:none;"/>
               <label for="photo" id="photoLabel">
                <div class ="fileChosen">
                  <i class="fa fa-picture-o" aria-hidden="true"></i>
                  <span id="chosen" style="visibility:hidden;">File chosen</span>
                </div>
               </label>
               </div>
                <button class="shareBtn" id="sharePost" type="submit"> SHARE</button>
            </div>
          </form>  
         <section class="modal hideIt" id="modalToSendPost">
         </section>
        </div>
       <div class ="prueb">
       ....
       </div> 

`;
  const moviePost = document.createElement('section');
  moviePost.classList.add('containerUserAndOthersPosts');
  moviePost.innerHTML = post;
  const chosen = moviePost.querySelector('#chosen');
  const photo = moviePost.querySelector('#photo');

  photo.addEventListener('change', () => {
    if (photo.length !== 0) {
      chosen.style.visibility = 'visible';
    }
  });

  userState(async (user) => {
    if (user) {
      const uid = user.uid;
      const sendPost = moviePost.querySelector('#sendPost');
      const toPostInput = moviePost.querySelector('#inputPost');
      const myUserInfo = await getUserInfoProfile(uid);
      const name = myUserInfo.data().name;
      const buttonSend = moviePost.querySelector('#sharePost');
      buttonSend.disabled = true;
      sendPost.addEventListener('submit', (e) => {
        e.preventDefault();
        const postInput = toPostInput.value.trim();
        const photoToPost = photo.files[0];
        const photoName = photoToPost.name;
        if (postInput === '') {
          showModal("You can't send an empty post");
        } else if (photoToPost.value === '') {
          showModal('You must select a photo');
        } else {
          uploadImg(photoName, photoToPost).then(() => {
            getLink(photoName).then((url) => {
              const img = url;
              createPost(postInput, uid, name, img);
              sendPost.reset();
              chosen.style.visibility = 'hidden';
            });
          });
        }
      });
      buttonSend.disabled = false;
    }
  });

  return moviePost;
};
