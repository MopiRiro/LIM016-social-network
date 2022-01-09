/* eslint-disable no-console */
import { userState } from '../Firebase/auth.js';
import { getUserInfoProfile } from '../Firebase/firestore.js';

export default () => {
  const userInfo = ` 
    <div class="containerAboutUser">
        <div class ="infoUserMobile">
          <div class="containerPhoto" id="containerPhoto"> </div>
          <p class ="userNameTimeline"> </p>
          <p class="userNickname"></p>
        </div>   
        <div class="userInfo">
              <p class="aboutMe">About me</p>
              <div class ="getToKnowUserChild">
                <i class="fa fa-film fa-lg" aria-hidden="true"></i>
                <p class ="input" id ="favMovie"> </p>
              </div>
              <div class ="getToKnowUserChild">
                <i class="fa fa-map-pin fa-lg" aria-hidden="true"></i>
                <p class ="input" id="city"> </p>
              </div>
              <div class ="getToKnowUserChild">
                <i class="fa fa-heart fa-lg" aria-hidden="true"></i>
                <p class ="input" id ="interests"> </p>
              </div>             
        </div>
    </div>
  
  `;
  const userInformation = document.createElement('section');
  userInformation.classList.add('containerUser');
  userInformation.innerHTML = userInfo;

  const userNameTimeLine = userInformation.querySelector('.userNameTimeline');
  const userNickname = userInformation.querySelector('.userNickname');
  const profilePictureUser = userInformation.querySelector('#containerPhoto');
  const city = userInformation.querySelector('#city');
  const favMovie = userInformation.querySelector('#favMovie');
  const interests = userInformation.querySelector('#interests');
  userState((user) => {
    if (user) {
      const uid = user.uid;
      getUserInfoProfile(uid).then((docSnap) => {
        const infoUser = docSnap.data();
        userNameTimeLine.textContent = infoUser.name;
        userNickname.textContent = infoUser.nickname;
        profilePictureUser.innerHTML = `
                     <img src="${infoUser.photo}" alt="userPhoto" class="userPhoto borderPhoto">
                    `;
        city.textContent = infoUser.city;
        favMovie.textContent = infoUser.favMovie;
        interests.textContent = infoUser.interests;
      });
    }
  });
  return userInformation;
};
