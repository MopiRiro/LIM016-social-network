/* eslint-disable no-console */
import { userState } from '../lib/auth.js';
import { getUserInfoProfileNow } from '../lib/firestore.js';

export default () => {
  const userInfo = ` 
    <div class="containerAboutUser">
        <div class="profilePictureUser"> </div>
        <div class="userInfo">
            <p class ="userNameTimeline"> </p>
            <p class="userEmail"></p>
            <div class ="getToKnowUser">
              
              <p class ="input" id ="aboutMe"> </p>
              <p class ="input" id="favMovie"> </p>
              <p class ="input" id ="favGenre"> </p>
  
            </div>
        </div>
    </div>
  
  `;
  const userInformation = document.createElement('section');
  userInformation.classList.add('containerUser');
  userInformation.innerHTML = userInfo;

  const userNameTimeLine = userInformation.querySelector('.userNameTimeline');
  const userEmailTimeLine = userInformation.querySelector('.userEmail');
  const profilePictureUser = userInformation.querySelector('.profilePictureUser');
  const aboutMe = userInformation.querySelector('#aboutMe');
  const favMovie = userInformation.querySelector('#favMovie');
  const favGenre = userInformation.querySelector('#favGenre');
  userState((user) => {
    if (user) {
      const uid = user.uid;
      getUserInfoProfileNow((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const infoUser = doc.data();
          if (uid === infoUser.id) {
            userNameTimeLine.textContent = infoUser.name;
            userEmailTimeLine.textContent = infoUser.email;
            profilePictureUser.innerHTML = `
                   <img src="${infoUser.photo}" alt="userPhoto" class="userPhoto">
                  `;
            aboutMe.textContent = infoUser.aboutUser;
            favMovie.textContent = infoUser.favMovie;
            favGenre.textContent = infoUser.favMovie;
          }
        });
      });
    }
  });
  return userInformation;
};
