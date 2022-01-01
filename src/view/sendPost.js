/* eslint-disable no-console */
import {
  createPost,
} from '../lib/firestore.js';

import { userState } from '../lib/auth.js';
import { showModal } from '../functions/modals.js';

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
               <p class = "iconUploadLetter">Photo</p>
               </div>
                <button class="shareBtn" type="submit"> SHARE</button>
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
      // window.location.hash = '#/timeline';
      const userName = user.displayName;
      const newUserName = userName || 'New User';

      const sendPost = moviePost.querySelector('#sendPost');
      const toPostInput = moviePost.querySelector('#inputPost');
      sendPost.addEventListener('submit', (e) => {
        e.preventDefault();
        const postInput = toPostInput.value.trim();
        if (postInput === '') {
          showModal("You can't send an empty post");
        } else {
          createPost(postInput, uid, newUserName, Date.now()).then(() => {
            sendPost.reset();
          }).catch((error) => console.log(error.message));
        }
      });
    }
  });

  return moviePost;
};
