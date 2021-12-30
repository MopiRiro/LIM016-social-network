/* eslint-disable no-console */
import { userState } from '../lib/auth.js';

export default () => {
  const userInfo = ` 
    <div class="containerAboutUser">
        <div class="profilePictureUser"> </div>
        <div class="userInfo">
            <p class ="userNameTimeline"> </p>
            <p class="userEmail"></p>
            <div class ="getToKnowUser">
              
              <p class ="input"> soy una persona que le gusta leer, escuchar música, ver muchas pleiculas e it al cine a ver los últimos estrenos</p>
  
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

  userState((user) => {
    if (user) {
    //   const uid = user.uid;
      // window.location.hash = '#/timeline';
      const userName = user.displayName;
      const newUserName = userName || 'New User';
      const userEmail = user.email;
      const userPhoto = user.photoURL ? user.photoURL : './img/profileDefault.png';
      userNameTimeLine.textContent = newUserName;
      userEmailTimeLine.textContent = userEmail;
      profilePictureUser.innerHTML = `
       <img src="${userPhoto}" alt="userPhoto" class="userPhoto">
      `;
    }
  });
  return userInformation;
};
